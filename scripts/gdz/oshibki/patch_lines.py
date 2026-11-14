"""Перерисовка строк в картинках старого формата (Times, тёмно-синий текст на белом)."""
from PIL import Image, ImageDraw, ImageFont
FONT='/System/Library/Fonts/Supplemental/Times New Roman.ttf'
COLOR=(0,0,80)
def lines(im, thr=300):
    w,h=im.size; px=im.load()
    rows=[y for y in range(h) if any(sum(px[x,y][:3])<thr for x in range(w))]
    seg=[];s=rows[0];prev=s
    for y in rows[1:]:
        if y!=prev+1: seg.append((s,prev)); s=y
        prev=y
    seg.append((s,prev)); return seg
def xext(im,y0,y1,x0=0,x1=None,thr=300):
    w,h=im.size; x1=x1 or w; px=im.load()
    xs=[x for x in range(x0,x1) for y in range(y0,y1+1) if sum(px[x,y][:3])<thr]
    return min(xs),max(xs)
def fit_size(text,width,lo=10,hi=60):
    best=None
    for s in range(lo*4,hi*4):
        f=ImageFont.truetype(FONT,s/4); b=f.getbbox(text)
        d=abs((b[2]-b[0])-width)
        if best is None or d<best[0]: best=(d,s/4)
    return best[1]
def redraw(im, box, text, x, size, baseline=None, top=None, color=COLOR, font=FONT):
    """box=(x0,y0,x1,y1) зачистить; text рисуется с левым краем x; вертикаль: top = верх заглавных/цифр."""
    d=ImageDraw.Draw(im); d.rectangle(box,fill=(255,255,255))
    f=ImageFont.truetype(font,size)
    b=f.getbbox('0')  # верх цифры
    d.text((x - f.getbbox(text)[0], top - b[1]), text, font=f, fill=color)
    return im
def redraw_line(im, y0, y1, text, x, size, color=COLOR, pad=2, x_end=None, font=FONT):
    """Стереть полосу строки [y0..y1] от x до x_end и нарисовать text так, чтобы верх его bbox пришёлся на y0."""
    d=ImageDraw.Draw(im); w=im.size[0]
    d.rectangle((x-pad, y0-pad, (x_end or w)-1, y1+pad), fill=(255,255,255))
    f=ImageFont.truetype(font,size); b=f.getbbox(text)
    d.text((x-b[0], y0-b[1]), text, font=f, fill=color)
