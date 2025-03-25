"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>("")
  const [tipPercentage, setTipPercentage] = useState<string>("15")
  const [tipAmount, setTipAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [numberOfPeople, setNumberOfPeople] = useState<string>("1")
  const [perPersonAmount, setPerPersonAmount] = useState<number>(0)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (billAmount) {
      const bill = Number.parseFloat(billAmount)

      if (bill < 0) {
        setError("Negative values not allowed")
        return
      } else {
        setError("")
      }

      const tip = bill * (Number.parseInt(tipPercentage) / 100)
      const total = bill + tip
      const people = Number.parseInt(numberOfPeople) || 1
      const perPerson = total / people

      setTipAmount(tip)
      setTotalAmount(total)
      setPerPersonAmount(perPerson)
    } else {
      setTipAmount(0)
      setTotalAmount(0)
      setPerPersonAmount(0)
      setError("")
    }
  }, [billAmount, tipPercentage, numberOfPeople])

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillAmount(e.target.value)
    if (Number(e.target.value) < 0) {
      setError("Negative values not allowed")
    } else {
      setError("")
    }
  }

  return (
    <div className="p-6 min-h-[100dvh] bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Tip Calculator</CardTitle>
          <CardDescription>Calculate your tip and split the bill easily.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bill-amount">Bill Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="bill-amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="pl-8"
                value={billAmount}
                onChange={handleBillAmountChange}
              />
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label>Tip Percentage</Label>
            <RadioGroup value={tipPercentage} onValueChange={setTipPercentage} className="grid grid-cols-4 gap-2">
              <div>
                <RadioGroupItem value="10" id="tip-10" className="peer sr-only" />
                <Label
                  htmlFor="tip-10"
                  className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-2 text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                >
                  10%
                </Label>
              </div>
              <div>
                <RadioGroupItem value="15" id="tip-15" className="peer sr-only" />
                <Label
                  htmlFor="tip-15"
                  className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-2 text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                >
                  15%
                </Label>
              </div>
              <div>
                <RadioGroupItem value="20" id="tip-20" className="peer sr-only" />
                <Label
                  htmlFor="tip-20"
                  className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-2 text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                >
                  20%
                </Label>
              </div>
              <div>
                <RadioGroupItem value="25" id="tip-25" className="peer sr-only" />
                <Label
                  htmlFor="tip-25"
                  className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-popover p-2 text-center peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                >
                  25%
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number-of-people">Number of People</Label>
            <Input
              id="number-of-people"
              type="number"
              min="1"
              placeholder="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
            />
          </div>

          <div className="space-y-4 rounded-lg bg-muted p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tip Amount:</span>
              <span className="font-medium">${tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium">${totalAmount.toFixed(2)}</span>
            </div>
            {Number.parseInt(numberOfPeople) > 1 && (
              <div className="flex justify-between border-t pt-2">
                <span className="text-muted-foreground">Per Person:</span>
                <span className="font-medium">${perPersonAmount.toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

