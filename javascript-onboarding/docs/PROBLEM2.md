## ๐ ๊ธฐ๋ฅ ์๊ตฌ ์ฌํญ

์ํธ๋ฌธ์ ์ข์ํ๋ ๊ดด์ง ๊ฐ๋ฐ์ ๋ธ๋ผ์ด์ด ์ด๋ฒ์๋ ์ค๋ณต ๋ฌธ์๋ฅผ ์ด์ฉํ ์๋ก์ด ์ํธ๋ฅผ ๋ง๋ค์๋ค. ์๋ฅผ ๋ค์ด "browoanoommnaon"์ด๋ผ๋ ์ํธ๋ฌธ์ ๋ค์๊ณผ ๊ฐ์ ์์๋ก ํด๋ํ  ์ ์๋ค.

1. "browoanoommnaon"
2. "browoannaon"
3. "browoaaon"
4. "browoon"
5. "brown"

์์์ ๋ฌธ์์ด cryptogram์ด ๋งค๊ฐ๋ณ์๋ก ์ฃผ์ด์ง ๋, ์ฐ์ํ๋ ์ค๋ณต ๋ฌธ์๋ค์ ์ญ์ ํ ๊ฒฐ๊ณผ๋ฅผ return ํ๋๋ก solution ๋ฉ์๋๋ฅผ ์์ฑํ๋ผ.

### ์ ํ์ฌํญ

- cryptogram์ ๊ธธ์ด๊ฐ 1 ์ด์ 1000 ์ดํ์ธ ๋ฌธ์์ด์ด๋ค.
- cryptogram์ ์ํ๋ฒณ ์๋ฌธ์๋ก๋ง ์ด๋ฃจ์ด์ ธ ์๋ค.

### ์คํ ๊ฒฐ๊ณผ ์์

| cryptogram        | result  |
| ----------------- | ------- |
| "browoanoommnaon" | "brown" |
| "zyelleyz"        | ""      |

<hr>

### ๊ธฐ๋ฅ ๋ชฉ๋ก

1. ๋ณ์ ์ ์ธ: ์ํธ ํด๋๋ฌธ์ ์ต์ข์ ์ผ๋ก ์ ์ฅํ  ๋ฌธ์์ด answer, ๋ฐ๋ณต๋ฌธ์ ํตํด ์ํธ๋ฌธ์ ํด๋ํ์ฌ ์ฐ์๋๋ ๋ฐ๋ณต ๋ฌธ์๋ฅผ ์ ๊ฑฐํ ๊ฒฐ๊ณผ๋ฅผ ์ ์ฅํ  ๋ฐฐ์ด decrypt.
2. delRepitition(): ์ํธ ๋ฌธ์ ๋ฐฐ์ด cryptoArray๋ฅผ ์ธ์๋ก ๋ฐ์, ํด๋น ๋ฐฐ์ด ๋ด์์ ์ฐ์๋๋ ๋ฐ๋ณต ๋ฌธ์๋ฅผ ๊ฒ์ฌํ๊ณ  ์ฐ์์ฑ์ด ์กด์ฌํ๋ ๋ฌธ์๋ค์ repeatedLetter ๋ฐฐ์ด์ ์ ์ฅํ์ฌ ์ดํ ๋ฌธ์์ ๋ํด ๊ฒ์ฌ์ ํ์ฉ ํ ์ ๊ฑฐํ๊ณ  ์ฐ์์ฑ์ด ํ์ธ๋์ง ์์ ๋ฌธ์๋ค์ decrypted ๋ฐฐ์ด์ ์ ์ฅํ์ฌ ๋ฐํํ๋ ํจ์์ด๋ค.
3. delReptition()์ ์ํํ ๋ฌธ์ ๋ฐฐ์ด๊ณผ ์ด์ ์ ์ํํ ๋ฌธ์ ๋ฐฐ์ด์ ๊ฐ์ด ๋์ผํ  ๋๊น์ง ๋ฐ๋ณตํ๋ค.
4. ์ต์ข์ ์ผ๋ก ์ถ์ถํ ๊ฒฐ๊ณผ ๋ฐฐ์ด(decrypt)์ ๋ฌธ์์ด๋ก ๋ณํํ์ฌ answer์ ์ ์ฅํ๊ณ  ๋ฐํํ๋ค.
