import argparse
import subprocess

def run_command(command):
    try:
        subprocess.run(command, check=True, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command {command}: {e}")
        return False
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deploy a project and restart Nginx on a remote server.")
    parser.add_argument("--ip", help="IP of the remote server", required=True)
    parser.add_argument("--username", help="Username for the remote server", required=True)
    parser.add_argument("--keyfile", help="Path to the SSH private key file", required=True)
    args = parser.parse_args()

    # Commands
    build_command = "sudo npm run build"
    scp_command = f"sudo scp -i {args.keyfile} -r build/ {args.username}@{args.ip}:/tmp/"
    remove_old_files_command = f"ssh -i {args.keyfile} {args.username}@{args.ip} 'sudo rm -rf /var/www/html/*'"
    remote_copy_command = f"ssh -i {args.keyfile} {args.username}@{args.ip} 'sudo cp -r /tmp/build/* /var/www/html'"
    remote_nginx_restart_command = f"ssh -i {args.keyfile} {args.username}@{args.ip} 'sudo systemctl restart nginx'"

    if run_command(build_command):
        if run_command(scp_command):
            if run_command(remove_old_files_command):
                if run_command(remote_copy_command):
                    run_command(remote_nginx_restart_command)

