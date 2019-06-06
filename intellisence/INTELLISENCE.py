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
    res = findVal + re.split(re.escape(findVal), o, flags=re.IGNORECASE)[-1]
    print(findVal, o, res)
    return res


path = ''

files = [f for f in glob.glob(path + "**/*")]
files = filter(lambda o: findValNodot in getPath(o).lower(), files)
files = map(lambda o: getPostfix(findValNodot, o), files)
for f in files:
    print(f.replace("/", "."))
