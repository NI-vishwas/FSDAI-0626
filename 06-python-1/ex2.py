

# nme = input("Enter your name: ")
# print("Hello,",nme)
# print("Hello,",nme,sep="_")
# print("Hello,",nme,sep="_",end="!")
# print("Hello, Vishwas \t Hello, Vishwas \n Hello, Vishwas")

# path = "C:\\Users\\Vishwas\\Desktop\\test.txt"
# print(path)

# # Raw Strings
# p = r"C:\Users\Vishwas\Desktop\test.txt"
# print(p)

# print(f"The File is available at {p}")
# cost = 100.34563413
# print(f"The cost of the product is {cost:.2f} USD")


num = int(input("Enter a number: "))
if num > 1:
    for i in range(num,0,-1):
        print(i,sep=" ", end=" ")
    print()
