#echo f INTELLISENCE
#echo p INTELLISENCE1
#echo INTELLISENCE2
#print("f INTELLISENCE")
import glob, sys, re, os
findVal = sys.argv[2]
findValNodot = findVal.strip(".")
#print(findValNodot)

ignoredirs=[".git", ".vscode"]

def getFiles(dir):
    result = []
    files = os.listdir(dir)
    for f in files:
        fullName = os.path.join(dir, f)
        if os.path.isdir(fullName):
            if f not in ignoredirs:
                result += getFiles(fullName)
        else:
            result.append(fullName)
    return result


def getPath(p):
    return p.replace("/", ".").replace("..", ".").strip(".").strip(".js")

def getPostfix(o):
#    print("searching:", o)
    return o.replace("mod." + findVal, "")
    
def check(o):
    return o.startswith("mod." + findVal)

path = ''

files = getFiles("./")
files = map(lambda o: getPath(o), files)
files = filter(lambda o: check(o), files)
files = map(lambda o: getPostfix(o), files)

for f in files:
    print(f.replace("/", "."))
