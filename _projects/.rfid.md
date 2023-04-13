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

## **The MCT Android app**

The Mifare Classic Tools app is a great tool

## **The Proxmark3**

# **Making a more secure RFID access system with Mifare 1k**

Having learned from my research and experiments on the Mifare classic 1k, I set out to make a more secure RFID 
access system than the ones I've encountered. To do so I used 

### **Hardware**

- Arduino Uno
- MFRC522 module (or other 13.56MHz RFID reader/writer)

### **Arduino libraries**

- MFRC522: to interact with the RFID reader
- EDB: to store and query a small database on the Arduino EEPROM (see 
[example](https://github.com/jwhiddon/EDB/blob/master/examples/EDB_Internal_EEPROM/EDB_Internal_EEPROM.ino))


To make things more fun I also used

- LCD screen (with Arduino library ...)
- Buzzer (with Arduino library ...)

but these are not strictly necessary, you could just output to serial.

## **Schematics**

..........


## **Code**

Here is what I would like my reader to do:
- Check if the tag is block 0 writable, if so deny access
- Read the UID
- If the UID is not registered, deny access.
- If the UID is registered, proceed to read data blocks (containing e.g. a second UID) using a key stored on the 
reader.
- If the data blocks are correct, grant access otherwise deny access.

The first step is very important: it prevents most UID clones (gen1 magic cards and CUID cards) but 1-time writable 
cards, where block 0 is locked after being written, will go through (FUID cards). See 
[\[1\]](https://github.com/RfidResearchGroup/proxmark3/blob/master/doc/magic_cards_notes.md#mifare-classic) for a 
description of the 
different types of UID-changeable Mifare cards.

In addition all sectors of registered tags should be read/write protected by a custom key *even if they are empty*! 
Otherwise it 
is trivial to recover all the keys using the nested attacks implemented on the Proxmark3. Even then, 
there are attacks (e.g. darkside) which do not require the knowledge of any key but they may not work if the PRNG of 
the chip is strong enough.

## **Testing with the Proxmark3**


# **Conclusion**
