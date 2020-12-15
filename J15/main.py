# Test grossier des bench avec le même algorithme
#
# Pour la partie 2 en python: ~8.8 secondes
#
# Pour la partie 2, même processeur, conditions similaires, même algorithme en JavaScript: ~286.4 secondes

f = open('input.txt', 'r')
input = list(map(int, f.read().split(',')))
f.close()

def resolve(n):
    fq = dict()
    prev = input[0]
    current = 0
    for i in range(1, n):
        if i >= len(input):
            if prev in fq:
                current = i - fq[prev]
            else:
                current = 0
        else:
            current = input[i]
        fq[prev] = i
        prev = current
    return current

print(resolve(2020))
print(resolve(30000000))
