#echo f INTELLISENCE
#echo p INTELLISENCE1
#echo INTELLISENCE2
#print("f INTELLISENCE")
import glob, sys, re
findVal = sys.argv[2]
findValNodot = findVal.strip(".")
#print(findValNodot)

def getPath(p):
    return p.replace("/", "")

def getPostfix(findVal, o):
    res = re.split(re.escape(findVal), o, flags=re.IGNORECASE)[-1]
    lastLength = len(findVal) + len(res)
    print(lastLength, res, o, o[:-lastLength])
    return o[:-lastLength - 1]
    
path = ''

files = [f for f in glob.glob(path + "**/*")]
files = filter(lambda o: findValNodot in getPath(o).lower(), files)
files = map(lambda o: getPostfix(findValNodot, o), files)
for f in files:
    print(f.replace("/", "."))
