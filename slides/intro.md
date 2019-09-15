## «Fullstack» тестирование на котлине

Паша Финкельштейн, Lamoda

---

## Кто я

* Разработчик
* Люблю тестировать
* Люблю изучать новое
* Люблю Kotlin

---

## О чём это

* Для тестирования используется множество инструментов
* В джаве богатая экосистема
* И «проверенные годами» инструменты

---

## Что дал миру JVM Kotlin

* DSL
* Extension methods
* Функции — first-class citizens

---

## И множество новых библиотек!!!

---

## Но зачем?

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

## Добро пожаловать в плоский мир
<!-- .slide: data-background="/images/world.jpg" -->

---

## А хочется прекрасного

```kotlin
group {
    subgroup {
        checkOneThing{ /* snip */ }
        checkAnotherThing{ /* snip  */ }
    }
    subgroup2 {
        checkSmthElse()
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
        Boolean expectedResult){ /* snip */}
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
    int num, List<String> list) {/* snip */}
```

---

## Всё ещё шумновато

* Аннотации
* Arrays.asList *(в новой джаве лучше)*
* Строки, в которых можно ошибиться
* Отдельные методы

---

## Тесты должны читаться легко 

![](/images/crowd.svg) <!-- .element: class="noborder" style="filter: invert(94%)" -->

---

# kotlintest

---

## Что надо запомнить

Kotlintest решает для нас проблемы

- Структурирования
- Параметризованных тестов
- Property-based тестирования

---

## Спасибо!

```kotlin
"Вопросы сейчас?"{ questions.shouldBeAskedNow() }   

"Вопросы потом?" {
    questions shouldBeSentTo oneOf(
        twitter  to "asm0di0",
        facebook to "asm0dey",
        github   to "asm0dey",
        telegram to "asm0dey"
```