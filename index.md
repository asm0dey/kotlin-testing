---
marp: true
title: "Testing with kotlin"
url: https://asm0dey.ru/p/devops-de
theme: gaia
size: 4K
class: default
paginate: true
footer: @asm0di0 at Twitter&emsp13;&emsp13;@asm0dey at Telegram&emsp13;&emsp13;@JugEkb
---
<style>
.hljs-variable { color: lightblue }
.hljs-string { color: lightgreen }
.hljs-params { color: #77c6d3 }
</style>
<!--
backgroundImage: "linear-gradient(to bottom, #000 0%, #1a2028 50%, #293845 100%)"
_class: lead
color: white
_paginate: false
_footer: ""
-->

# <!-- fit --> Kotlintest и все-все-все

![height:300](images/winney.png)

## <!-- fit --> Паша Финкельштейн, Jetbrains

---
<!--
_class: lead
-->
## Кто я

- Разработчик
- Люблю тестировать
- Люблю изучать новое
- Люблю Kotlin

---

<!--
_class: lead
-->
## О чём это

- Для тестирования используется множество инструментов
- В джаве богатая экосистема
- И «проверенные годами» инструменты

---
## Что дал миру JVM Kotlin

- DSL
- Extension methods
- Функции — first-class citizens
---
<!--
_class: lead
-->
## <!-- fit --> И множество новых библиотек!
---
<!--
_class: lead
-->
## <!-- fit --> Но зачем?

---
## Структура
Сейчас как-то так:

```java
class MyVeryImportantTest {
    @Test
    void feature_should_work_somehow(){ /*snip*/ }
    @Test
    void feature_should_work_somehow2(){ /*snip*/ }
    @Test
    void feature_should_work_somehow3(){ /*snip*/ }
}
```
---
<!-- 
_class: lead
 -->
![bg](images/world.jpg)
# Добро пожаловать в плоский мир

---
## А хочется прекрасного

```kotlin
passwordService {
    shouldHash {
        length { /* snip */ }
        salt { /* snip  */ }
    }
    shouldCheck {
        validPasswords()
        invalidPasswords()
    }   
}
```
---

## Parametrized tests

*TestNG*

```java
@DataProvider(name = "test1")
public static Object[][] primeNumbers() {
    return new Object[][] { {2, true}, {6, false}, 
        {19, true}, {22, false}, {23, true}};
}

@Test(dataProvider = "test1") 
void testPrimeNumberChecker(Integer inputNumber, 
        Boolean expectedResult){ /- snip */}
```

---
## Parametrized tests

*JUnit 5*

```java
static Stream<Arguments> stringIntAndListProvider() {
    return Stream.of(
        arguments("apple", 1, Arrays.asList("a", "b")),
        arguments("lemon", 2, Arrays.asList("x", "y"))
    );
} 
@ParameterizedTest
@MethodSource("stringIntAndListProvider")
void testWithMultiArgMethodSource(String str, 
    int num, List<String> list) {/- snip */}
```

---

## Всё ещё шумновато

- Аннотации
- Arrays.asList *(в новой джаве лучше)*
- Строки, в которых можно ошибиться
- Отдельные методы

---
<!-- _class: lead -->
<style scoped>img { filter: invert(94%) }</style>

## Тесты должны читаться легко 

![](images/crowd.svg)

---
<!-- _class: lead -->
# Поговорим о безопасности

![height:500](images/safety.jpg)

---
## Безопасность на лесопилке

Надо хранить пароли. Но как?

- Plain
- MD5(plain)
- MD5(plain+salt)
- MD5(md5(plain)+salt)

Быстро! 
**200 GH/s** @ 8x Nvidia GTX 1080 Founders Edition with *Hashcat*

---
## И что делать?

### Плакать

#### Или использовать bcrypt/scrypt


Хэш начинается с магического `$2a$10`

`$2a` — версия bcrypt
`$10` — количество раундов «соления»

Они **очень** медленные (100/1000 в секунду)

---
<!-- _class: lead -->
# <!-- fit --> Kotlintest
## It's demo time!
---

## Но есть и проблемы

- Property-based тесты не имеют уникального идентификатора (*но в пути*)
    - В jqwik сделано лучше
- В репортах логгируется только последняя текстовая часть теста
- В IDEA поддержка так себе: тесты нельзя запускать по одному

---

## Что надо запомнить

Kotlintest решает для нас проблемы

- Структурирования
- Параметризованных тестов
- Property-based тестирования

---

## <!-- fit --> Спасибо! Вопросы?


asm0di0 @ Twitter
asm0dey @ Telegram
it.asm0dey.ru
