import subprocess
import sys

try:
    # Hard reset to commit
    result1 = subprocess.run(['git', 'reset', '--hard', '235b522b3da3cc5b4b2b9f595cc6b2571b7d7c3a'], 
                            check=True, capture_output=True, text=True)
    print(result1.stdout)
    
    # Force push to origin
    result2 = subprocess.run(['git', 'push', '--force', 'origin', 'main'], 
                            check=True, capture_output=True, text=True)
    print(result2.stdout)
    print("Successfully reset and force pushed!")
except subprocess.CalledProcessError as e:
    print(f"Error: {e}")
    print(f"Output: {e.stdout}")
    print(f"Error output: {e.stderr}")
    sys.exit(1)

