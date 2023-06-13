---
layout: page
title: Arduino RFID reader
description: Attempting to make a secure RFID access system on Arduino using Mifare 1k chips and MFRC522.
img: assets/img/rfid.jpg
importance: 0
category: fun
---

![Proxmark3 running Iceman Firmware](/assets/img/rfid.jpg)

Radio Frequency IDentification (RFID) is a very common solution for access cards, 
public transport tickets, etc. Most likely you can find one such chip, in some form or other, in your immediate 
surroundings. This made me curious about the inner workings of such access systems and their security.

**How secure are typical RFID access systems?**

Spoiler alert: They're not very secure at all and vulnerable to even hackers on a budget.

There are two main frequencies used for RFID: 125kHz and 13.56MHz. The most common 125kHz chip is the em4100 while for 13.56MHz there are several: iClass, ISO15693 and Mifare to name a few. In my experience Mifare classic chips, despite not being secure, are the most prevalent and also the most well-documented. This makes them perfectly suited for RFID learning and hacking.

## **Mifare classic**

The Mifare classic is used a lot in access cards and is definitely the most commonly encountered RFID chip. It comes in two sizes 1kB and 4kB with the former being most common in my experience. The memory layout of the classic 1k is divided in 16 sectors with 4 blocks each.

![Memory layout of the mifare classic 1k](/assets/img/mfclassic1k.png)

All sectors have the same structure with three data blocks and a trailer block, all 16 bytes long. The trailer block contains two 48-bits keys for read/write authentication, 3-byte for access conditions and 1 extra data byte. The access conditions specify which keys are to be used for read/write/increment/decrement operations among other things. See the official [mifare classic datasheet](https://www.nxp.com/docs/en/data-sheet/MF1S50YYX_V1.pdf) for more details on access conditions, authentication and commands.

Block 0 of sector 0, the manufacturer block, starts with a 4-byte (or 7-byte) UID which, in the official implementation, cannot be modified. However there are block-0 writable cards out there. There are different types of such cards and it can be confusing to navigate the names and different capabilities so below is a table with the most common types of block-0 writable chips 

| Type           	|| Capabilities                                            	|| Writable with      	|
|----------------	||---------------------------------------------------------	||--------------------	|
| Gen 1a (magic) 	|| Writable after "magic" byte sequence <br> and authentication 	|| MFRC522, proxmark3 	|
| Gen2 (CUID)    	|| Direct writable                                         	|| MCT app, proxmark3 	|
| Gen2 (FUID)    	|| One-time direct writable then locked                    	|| MCT app, proxmark3 	|

<br>
**The fact that the UID can be cloned means that UID-only based access systems are easy to fool. Yet many organizations still use such access systems with mifare classic cards.**

## **The Proxmark3**

This device is the RFID swiss army knife. Initially developped for research, the hardware and software has been continuously improved by a community of security researchers and enthusiasts. While the official proxmark3 is relatively expensive, there exists a chinese version, so-called "proxmark3 easy", which is a lot cheaper and, for most purposes, just as functional. In particular it can run the famous nested and hardnested attacks on Mifare classic chips. Equipped with the [ICEMAN firmware](https://github.com/RfidResearchGroup/proxmark3), the proxmark3 easy is an affordable, powerful and I dare say user-friendly RFID pentesting tool.

![Proxmark3 running Iceman Firmware](/assets/img/pm3.png)

## **The MCT Android app**

Another great RFID tool is the [Mifare Classic Tools app](https://play.google.com/store/apps/details?id=de.syss.MifareClassicTool) which is great for reading, writing and analyzing cards data on the go. It does not implement any attack except for a dictionary attack which can be convenient. It works great in combination with the proxmark3: you can add keys recovered with the proxmark3 to the dictionaries allowing you to read/write protected cards on the go.

# **Making a more secure RFID access system with Mifare 1k**

Having learned from my research and experiments on the Mifare classic 1k, I set out to make a more secure RFID 
access system than the ones I've encountered. 

Here is what I would like my reader to do:
- Check if the tag is block 0 writable, if so deny access
- Read the UID
- If the UID is not registered, deny access.
- If the UID is registered, proceed to read data blocks (containing e.g. a second UID) using a key stored on the 
reader.
- If the data blocks are correct, grant access otherwise deny access.

The first step is very important: it prevents most UID clones (gen1 magic cards and CUID cards) but one-time writable 
cards, where block 0 is locked after being written, will go through (FUID cards).

In addition all sectors of registered tags should be read/write protected by a custom key *even if they are empty*! 
Otherwise it is trivial to recover all the keys using the nested attacks implemented on the Proxmark3. Even then, 
there are attacks (e.g. darkside) which do not require the knowledge of any key but they may not work if the PRNG of 
the chip is strong enough.

### **Hardware**

- Arduino Uno
- MFRC522 module (or other 13.56MHz RFID reader/writer)

In order to produce nicer output when access is granted/denied I also used

- LCD screen 
- Passive buzzer

but these are not strictly necessary, you could just output to serial. These components were used with the following arduino libraries:

- [MFRC522](https://github.com/miguelbalboa/rfid)
- [LiquidCrystal](https://github.com/arduino-libraries/LiquidCrystal)
- [CuteBuzzerSounds](https://github.com/GypsyRobot/CuteBuzzerSounds)

[EDB](https://github.com/jwhiddon/EDB) was also used to store and query a small database on the Arduino EEPROM (see
[example](https://github.com/jwhiddon/EDB/blob/master/examples/EDB_Internal_EEPROM/EDB_Internal_EEPROM.ino)).


## **Schematics**

Below is a possible wiring between the arduino board and the other components.

![Arduino RFID reader wiring](/assets/img/rfid-reader.png)

Note: The potentiometer controlling the contrast of the LCD display is not shown.

## **Code**

The [code](https://github.com/robinplantey/mifare1k-reader) is available on github.

# **Conclusion**

The mifare classic 1k has been completely reverse-engineered and efficient attacks against it exist, some of which are conviniently implemented in devices like the proxmark3. Access systems based on this chip should therefore not be considered secure. However it is possible to dramatically improve the security of such access systems by introducing a token in the data blocks and having custom keys for **all** the 16 sectors. This is a simple and efficient improvement compared to UID-only access systems which makes it a lot harder for a budget hacker to clone a card.
