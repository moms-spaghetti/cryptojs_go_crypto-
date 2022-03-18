package crypto

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/sha1"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"log"

	"golang.org/x/crypto/pbkdf2"
)

const (
	passphrase = "testingpassphrase"
    length = 16
    salt = "testingsalt"
)

func Encrypt(input string) string {
	key := pbkdf2.Key([]byte(passphrase), []byte(salt), 1000, length, sha1.New)
   
    iv := pbkdf2.Key([]byte(passphrase), []byte(salt), 2000, length, sha1.New)
    
    c, _ := aes.NewCipher(key)

    content := pkcs7padding([]byte(input), c.BlockSize())

    out := make([]byte, len(content))
    mode := cipher.NewCBCEncrypter(c, iv)
    mode.CryptBlocks(out, content)

	fmt.Println("key: ", hex.EncodeToString(key[:]))
	fmt.Println("iv: ", hex.EncodeToString(iv[:]))

	return base64.StdEncoding.EncodeToString(out)
}

func Decrypt(input string) string {
	decoded, err := base64.StdEncoding.DecodeString(input)
	if err != nil {
		log.Panicf("decode error: %v", err)
	}

	key := pbkdf2.Key([]byte(passphrase), []byte(salt), 1000, length, sha1.New)
   
    iv := pbkdf2.Key([]byte(passphrase), []byte(salt), 2000, length, sha1.New)
    
    c, _ := aes.NewCipher(key)

    out := make([]byte, len([]byte(decoded)))
    mode := cipher.NewCBCDecrypter(c, iv)
    mode.CryptBlocks(out, []byte(decoded))

	return string(out)
}

func pkcs7padding(ciphertext []byte, blockSize int) []byte {
    padding := blockSize - len(ciphertext)%blockSize
    padtext := bytes.Repeat([]byte{byte(padding)}, padding)
    return append(ciphertext, padtext...)
}
