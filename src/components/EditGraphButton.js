import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { React, useState, useEffect } from 'react';

/* File download imports */
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useTheme } from '@emotion/react';

export const EditGraphButton = ({ apiData, headers, columnsInView, setColumnsInView }) => {
  const [anchorElExport, setAnchorElExport] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rotated, setRotated] = useState(false);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const [isColumnEditorOpen, setIsColumnEditorOpen] = useState(false);
  const [originalHeaders, setOriginalHeaders] = useState(null);

  /* COLUMN EDITOR */

  const handleOpenColumnEditor = () => {
    setIsColumnEditorOpen(true);
  };

  const handleColumnChange = (newColumnsInView) => {
    setColumnsInView(newColumnsInView);
  };
  const handleResetColumns = () => {
    setColumnsInView(originalHeaders.map((_, index) => index));
  };

  const ColumnEditor = ({ columns, columnsInView, onColumnChange }) => {
    const [localColumnsInView, setLocalColumnsInView] = useState(columnsInView);
    const [hiddenColumns, setHiddenColumns] = useState(
      columns.map((_, index) => index).filter((index) => !columnsInView.includes(index)),
    );

    useEffect(() => {
      setHiddenColumns(
        columns.map((_, index) => index).filter((index) => !localColumnsInView.includes(index)),
      );
    }, [localColumnsInView]);

    const handleColumnSelectionChange = (index, isHidden) => {
      if (isHidden) {
        setLocalColumnsInView((prevState) => [...prevState, index]);
      } else {
        setLocalColumnsInView((prevState) => prevState.filter((i) => i !== index));
      }
    };

    const handleMoveColumn = (index, direction) => {
      setLocalColumnsInView((prevState) => {
        const newState = [...prevState];
        const [removedColumn] = newState.splice(index, 1);
        newState.splice(index + direction, 0, removedColumn);
        return newState;
      });
    };

    useEffect(() => {
      onColumnChange(localColumnsInView);
    }, [localColumnsInView]);

    return (
      <div>
        <List>
          {localColumnsInView.map((colIndex, index) => (
            <ListItem key={colIndex} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!hiddenColumns.includes(colIndex)}
                  tabIndex={-1}
                  disableRipple
                  onClick={() => handleColumnSelectionChange(colIndex, false)}
                />
              </ListItemIcon>
              <ListItemText primary={columns[colIndex]} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleMoveColumn(index, -1)}
                  disabled={index === 0}
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleMoveColumn(index, 1)}
                  disabled={index === localColumnsInView.length - 1}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <h3>Hidden</h3>
        <List>
          {hiddenColumns.map((colIndex) => (
            <ListItem key={colIndex} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={false}
                  tabIndex={-1}
                  disableRipple
                  onClick={() => handleColumnSelectionChange(colIndex, true)}
                />
              </ListItemIcon>
              <ListItemText primary={columns[colIndex]} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  /* ----------------- */
  /* CHART SETTINGS */

  const handleClickChartSettings = (event) => {
    setRotated((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseChartSettings = () => {
    setRotated(false);
    setAnchorEl(null);
  };

  /* EXPAND HANDLERS */
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* ----------------- */
  /* EXPORT OPTIONS */

  const handleExportMenuOpen = (event) => {
    setAnchorElExport(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setAnchorElExport(null);
  };

  const handleExportData = (format) => {
    exportData(format);
    handleExportMenuClose();
  };

  /* ----------------- */
  /* apiData EXPORT FUNCTIONS */

  const transformDataForExcel = () => {
    const columns = Object.keys(apiData);
    const indices = [
      ...new Set(Object.values(apiData).flatMap((serieData) => Object.keys(serieData))),
    ];

    const excelData = [['Index', ...columns]];

    indices.forEach((index) => {
      const row = [index];
      columns.forEach((column) => {
        row.push(apiData[column][index] ? apiData[column][index] : null);
      });
      excelData.push(row);
    });

    return excelData;
  };

  const exportData = (format) => {
    let dataToExport = apiData;

    if (typeof apiData === 'string') {
      try {
        dataToExport = JSON.parse(apiData);
      } catch (error) {
        console.error('Error parsing JSON string:', error);
        return;
      }
    }
    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(dataToExport)], { type: 'application/json' });
        saveAs(jsonBlob, 'apiData.json');
        break;
      case 'raw':
        const rawBlob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'text/plain' });
        saveAs(rawBlob, 'apiData.txt');
        break;
      case 'excel':
        const excelData = transformDataForExcel(dataToExport);
        const worksheet = XLSX.utils.aoa_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'apiData.xlsx');
        break;
      default:
        break;
    }
  };
  return (
    <Box>
      <Tooltip title="Chart Settings" placement="top">
        <IconButton
          aria-label="settings"
          onClick={handleClickChartSettings}
          sx={{ color: theme.scrollBar.main }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseChartSettings}
      >
        <MenuItem
          onClick={() => {
            handleCloseChartSettings();
            /* onEditClick(); */
          }}
        >
          Customize Chart <TuneIcon style={{ marginLeft: 20 }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseChartSettings();
            handleOpenColumnEditor();
          }}
        >
          Edit Columns <Rotate90DegreesCcwIcon style={{ marginLeft: 'auto' }} />
        </MenuItem>
        <MenuItem onClick={handleExportMenuOpen} style={{ position: 'relative' }}>
          Export apiData <FileDownloadIcon style={{ marginLeft: 'auto' }} />
          <Menu
            id="export-menu"
            anchorEl={anchorElExport}
            open={Boolean(anchorElExport)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getcontentanchorel={null}
            onClose={(e) => {
              e.stopPropagation();
              handleExportMenuClose();
            }}
          >
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleExportData('json');
              }}
            >
              JSON (.json)
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleExportData('raw');
              }}
            >
              RAW (.txt)
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleExportData('excel');
              }}
            >
              Excel (.xlsx)
            </MenuItem>
          </Menu>
        </MenuItem>
        <MenuItem onClick={handleOpen}>
          Expand <OpenInFullIcon style={{ marginLeft: 'auto' }} />
        </MenuItem>
      </Menu>

      <Dialog open={isColumnEditorOpen} onClose={() => setIsColumnEditorOpen(false)} fullWidth>
        <DialogTitle>Edit Columns</DialogTitle>
        <DialogContent>
          <ColumnEditor
            columns={headers}
            columnsInView={columnsInView}
            onColumnChange={handleColumnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsColumnEditorOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleColumnChange(columnsInView);
              setIsColumnEditorOpen(false);
              /* updateFormattedData(); */
            }}
          >
            SAVE
          </Button>
          <Button onClick={handleResetColumns}>Reset to Default</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
