import os
import time

while True:
    time.sleep(5)
    for root, dirs, files in os.walk("./COMP", topdown=False):
        for name in files:
            path = (os.path.join(root, name))
            print(path)
            if "cff" in name:
                os.system(f"mv {path} ./DF/{name.split('.')[0]}.png")
            else:
                os.system(f"mv {path} ./CF/{name.split('.')[0]}.cff")
