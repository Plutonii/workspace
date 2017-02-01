package ru.plutonii.controller;

/**
 * Created by plutonii on 31.01.17.
 */
public class Test extends T{
    int id;
    String name;
    int[][] arr;

    public Test1 getTest1() {
        return test1;
    }

    public void setTest1(Test1 test1) {
        this.test1 = test1;
    }

    Test1 test1;

    public int[][] getArr() {
        return arr;
    }

    public void setArr(int[][] arr) {
        this.arr = arr;
    }

    public Test() {
        arr = new int[3][5];
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 5; j++) {
            arr[i][j]=i*j;
            }
        test1 = new Test1();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
