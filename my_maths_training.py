from random import randint
from time import *
import os


def p1or2():
    x = randint(0,1)
    return x

def draw(no):
    x = randint(1,no)
    return x

def question(no,length):
    l = []
    l2 = []
    for i in range(length+1):
        l.append(draw(no))

    for j in range(length):
        l2.append(p1or2())

    x = l[0]
    print(str(l[0]), end='')
    for k in range(length):
        if l2[k] == 0:
            print('+' + str(l[k+1]), end='')
            x += l[k + 1]

        else:
            print('-' + str(l[k+1]), end='')
            x -= l[k + 1]

    return x


if __name__ == '__main__':
    while True:
        while True:
            try:
                i = int(input('number of questions'))
                inl = int(input('input number limit'))
                noo = int(input('number of operations'))
            except:
                print('please enter a number')
                break

            c = 0
            tl = []
            for ii in range(i):
                x = question(inl, noo)
                t1 = perf_counter()
                try:
                    a = int(input('\ninput your answer'))
                    os.system('cls')
                except:
                    print('please enter a number')
                    break

                if a == x:
                    print('correct!')
                    c += 1
                else:
                    print('wrong 0^0, correct answer is {}'.format(x))
                tl.append(perf_counter()-t1)
                print(perf_counter()-t1)

                if ii == i - 1:
                    print(c / i * 100, '% in {} questions'.format(c))
                    st = 'Q#:{},O#:{},L:{}, tt:{}, at:{}'.format(i,noo,inl,round(sum(tl),3),round(sum(tl)/i,3))
                    print(st)
                    st = strftime('%Y-%m-%d %H:%M:%S',localtime(time()))+'\n' + st
                    with open('math data','a') as oo:
                        oo.write('\n'+st)

                    if c == i:
                        print('perfect!!')


