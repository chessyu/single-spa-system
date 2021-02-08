import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair
// 位数：1024，密钥格式：PKCS#8，证书密码：htsd668 
let publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDd1aLWTrQIxSxirYe/NZ+zSKKC
QyWz6B9CVwM3AxMDXanJ4TqoIraR7uS+mKKYI78rhtwpnM1YLOIvQ1rPC+zv0Tvz
HiiMp21txiUNb2vaY6t/ZD/FNQgvJetHitUCLZeIVhTl1Yf8uJr8HEZwKnI/335c
vm5v3fDZ+cmqUZEH9QIDAQAB
-----END PUBLIC KEY-----
`


let privateKey = `
-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAN3VotZOtAjFLGKt
h781n7NIooJDJbPoH0JXAzcDEwNdqcnhOqgitpHu5L6YopgjvyuG3CmczVgs4i9D
Ws8L7O/RO/MeKIynbW3GJQ1va9pjq39kP8U1CC8l60eK1QItl4hWFOXVh/y4mvwc
RnAqcj/ffly+bm/d8Nn5yapRkQf1AgMBAAECgYA7EqTmRNcUbs0/Cc7YUENSzsjX
v2HO4sVQOTOV9q+dede49s1T8MqFWgR37NV/hiVmRedi/WqBTJJ+24TXFenmA+aR
3uhrRhEWC0XOL7irJ+tLxg0AfoRmvY8JljfVq9dH9YUV3eEsp5aDKO3AiR8dx/QO
TcqiEhKxtch/wIqxkQJBAPbFkZhOmUfe4Hzb8IUixMVOgQI86/CShMSHTsWKMsiD
wM4f4vJ45i5pH0HVh7vU0JwDQqoAOmbalM1HBF8hL28CQQDmIVWmFtLUqtTsZ6lN
dqIFEU6hfID34BV+HYPuDPfTqoTdQWpYt4HngCdhB1RpONKdSSLanyVguHOjPJFH
L8zbAkEAl990Abat42up4W5DEs0ZKQ1tnID9/GtQRtu3gR/SrVFZAgLh27TIhVux
HwVZqiIJ2VqwVowZZV+1ILlKWXnFBQJAesKtfbwPG4NFshZaKghuxWVGHL7dzVys
GmqERiiEy1TbK2wJ3umFUoj6eLgAP2EgeObawOTEe6Ppi9pzZRYKoQJAaaC+h7Ht
tYH+t1MwCR876mXCUXWsuzKJd5wZTBuF2N8dOURLK8BmZppla0HAmwUxGtNC3YRI
sFnHm9bAjt/cqw==
-----END PRIVATE KEY-----
`


// 加密
export function encrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}
  
// 解密
export function decrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(privateKey)
    return encryptor.decrypt(txt)
}
  
  