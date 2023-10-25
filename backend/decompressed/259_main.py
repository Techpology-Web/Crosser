import json
import math

# Opening JSON file

# returns JSON object as
# a dictionary
f1 = open('datasep.json')
data1 = json.load(f1)

f2 = open('our.json')
data2 = json.load(f2)
# Iterating through the json
# list
swedorders = []
sumswe = 0
retswe = 0
for i in data1['Records']:
    if (i["SubSite"]) == "5594341512":
        swedorders.append({
            "ref": i["OrderReference"],
            "price": int(i["Amount"]*100),
            "vatprice": round(i["VatAmount"]*100)
        })
        if i["Amount"] > 0:
            sumswe += i["Amount"]
        else:
            retswe += i["Amount"]
        

ourorders = []
sumour = 0
for i in data2:
    ourorders.append({
        "ref": i["uniqeId"],
        "price": (i["amount"]),
        "vatprice": i["vatAmount"]
    })
    sumour += i["amount"]/100
# Closing file
f1.close()
f2.close()


print(retswe)
print(sumswe+retswe-498,sumour-537)
print(len(swedorders),len(ourorders))
comb = swedorders+ourorders
uniq = []

for i in comb:
    if i in uniq:
        uniq.remove(i)
    else:
        uniq.append(i)

suma = 0
for i in uniq:
    print(i)
    suma += i["price"]

print(suma)
print(sumour+(suma/100))
