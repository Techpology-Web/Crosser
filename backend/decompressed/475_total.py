import json
import os

data = json.load(open("data.json"))
reverse = 0
amt = []
for i in data['Records']:
    if i["SubSite"] == "5594341512":
        if i["Type"] == "Reversal":
            print(i["Amount"])
            reverse += i["Amount"]        
        amt.append(i["Amount"])
        

print(amt)
#print(amt,reverse,amt+reverse-498)

    #for prod in i["products"]
