// file to create all the basic firebase function
// create read update delete 
"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { getDocs } from "firebase/firestore";


export const getHouseList = async (): Promise<any> => {
    const housesCollection = await firebase.firestore().collection("houses")
    const houses = await getDocs(housesCollection)
    var list: any = [{}]
    houses.docs.map((doc, i) => {
        list[i] = doc.data()
    });
    console.log(list)
    return list
}

export const getHouseDetails = async (houseId: String): Promise<any> => {
    const housesCollection = await firebase.firestore().collection("houses").doc(houseId).get()
    var returnData = housesCollection.data()
    return returnData
}

export const getHouseLogsOnDateRange = async (
    houseId: String,
    selectedMonth: number,
    selectedYear: number): Promise<any> => {

    let start = new Date(selectedYear + "-" + selectedMonth + "-01");
    var month = selectedMonth;
    var year = selectedYear;

    if (selectedMonth == 12) {
        month = 1;

        year = Number(selectedYear) + 1;
    } else {
        month = Number(selectedMonth) + 1;
        year = selectedYear;
    }
    let end = new Date(year + "-" + month + "-01");

    const houseLogsCollection = firebase.firestore().collection("houseLogs");
    const houseLogs = houseLogsCollection
        .where("houseId", "==", houseId)
        .where("date", ">", start)
        .where("date", "<", end);
    const houseLogsVal = await getDocs(houseLogs);
    var list: any = [{}]
    houseLogsVal.docs.map((doc, i) => {
        list[i] = doc.data()
        list[i]['id'] = doc.id // manual update the id here
    });

    return list
}

export const deleteHouseLog = async (houseId : string) : Promise<any> => {
    var status;
    firebase
    .firestore()
    .collection("/houseLogs")
    .doc(houseId)
    .delete().then((val: any) =>{
        console.log(val)
        status = val
    })
    return status;
}