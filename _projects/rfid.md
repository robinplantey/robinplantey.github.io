---
layout: page
title: Arduino RFID adventures
description: Attempting to make a secure RFID access system on Arduino using Mifare 1k chips and MFRC522. Pentesting with the Proxmark3. 
img: assets/img/rfid.png
importance: 2
category: fun
---

Radio Frequency IDentification (RFID) is ubiquitous in our daily lives: hotel and smart lock keys, access cards, 
public transport tickets, etc. Most likely you can find one such chip, in some form or other, in your immediate 
surroundings. And so I became curious 

- **How secure are typical RFID access systems?**

Spoiler alert: They're not very secure at all and vulnerable to even hackers on a budget.

Let's talk a little about the technology itself

### **125 kHz**

### **13.56 MHz**

## **Mifare classic**

## **The Proxmark3**

# **Making a more secure RFID access system with Mifare 1k**

Having learned from my research and experiments on the Mifare classic 1k, I set out to make a more secure RFID 
access system than the ones I've encountered. To do so I used 

### **Hardware**

- Arduino Uno
- MFRC522 module (or other 13.56MHz RFID reader/writer)

### **Software**

- Arduino library MFRC522

To make things more fun I also used

- LCD screen (with Arduino library ...)
- Buzzer (with Arduino library ...)

but these are not strictly necessary, and you can just output to the Arduino serial.

## **Schematics**

..........


## **Code**

Here is what I want my reader to do:
- Check if the tag is block 0 writable, if so deny access
- Read the UID
- If the UID is not registered, deny access.
- If the UID is registered, proceed to read data blocks (containing e.g. a second UID) using a key stored on the 
reader.
- If the data blocks are correct, grant access otherwise deny access.


In addition all sectors of registered tags should be read/write protected by a custom key *even if they are empty*! 
Otherwise it 
is trivial to recover all the keys using the nested attacks implemented on the Proxmark3. Even then, 
there are attacks (e.g. darkside) which do not require the knowledge of any key but they may not work if the PRNG of 
the chip is strong enough.
 


## **Testing with the Proxmark3**
