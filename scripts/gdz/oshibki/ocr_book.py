import sys, subprocess, os, tempfile
from concurrent.futures import ThreadPoolExecutor
S=os.path.expanduser("~/.cache/halyavka-ocr")
def run(pdf, tag, first=1, last=None):
    out=os.path.join(S,tag); os.makedirs(out,exist_ok=True)
    n=int([l for l in subprocess.run(['pdfinfo',pdf],capture_output=True,text=True).stdout.splitlines() if l.startswith('Pages')][0].split()[1])
    last=last or n
    def one(p):
        o=os.path.join(out,'p%03d'%p)
        if os.path.exists(o+'.txt'): return
        subprocess.run(['pdftoppm','-f',str(p),'-l',str(p),'-r','110','-gray','-png','-singlefile',pdf,o],check=True)
        subprocess.run(['tesseract',o+'.png',o,'-l','ukr'],capture_output=True)
        os.remove(o+'.png')
    with ThreadPoolExecutor(8) as ex: list(ex.map(one,range(first,last+1)))
    print(tag,'done',n)
for a in sys.argv[1:]:
    pdf,tag=a.split('::'); run(pdf,tag)
