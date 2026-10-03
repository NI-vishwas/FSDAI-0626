
# Demostrating a List

# Create a list
# l1 = []
# l2 = list()
# l3 = [1,2,34.45,"vishwas",[45,98,23],{1:"apple",2:"mango"},(1,2,3,"mango")]
# print("l3:",l3)
# # Adding a element
# print("l1:",l1)
# l1.append(90)
# print("l1:",l1)
# l1.append("apple")
# print("l1:",l1)

# l1.insert(1,"mango")
# print("l1:",l1)

# Dictionary
# d1 = {}
# d2 = dict()
# d3 = {1:"apple",2:"mango"}

# d3[3] = "grapes"
# print(d3[2])

m = 100
def add(a,b):
    m = 75
    print("Inside add m: ", m)
    return a+b

def sub(a,b):
    print("Inside Sub m: ", m)
    return a-b

if __name__ == '__main__':
    print("Inside main: m",m)
    print(add(23,45))
    print(sub(600,23))