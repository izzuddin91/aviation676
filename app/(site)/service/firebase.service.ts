// file to create all the basic firebase function
// create read update delete 
"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { getDocs } from "firebase/firestore";
import { getUserAuth } from "@/app/util/auth.util";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const todayDate = new Date();
const day = todayDate.toLocaleString("en-US", { day: "2-digit" });
const month = todayDate.toLocaleString("en-US", { month: "long" });
const year = todayDate.getFullYear();


export const getCleaningList = async (): Promise<any> => {

// get the year, date month of today
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // getMonth() returns month index starting from 0
const day = today.getDate();

    // console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
    let start = new Date(year + "-" + month + "-" + day);
    const housesCollection = await firebase.firestore().collection("houseLogs").where("category", "==", 'cleaning').where("date", ">", new Date()).orderBy('date', 'asc')
    const houses = await getDocs(housesCollection)
    var list: any = [{}]
    houses.docs.map((doc, i) => {
        list[i] = doc.data()
    });
    return list
}

export const uploadFileAndReturnUrl = async (file: any, houseId: string): Promise<any> => {
    let s = ''
    file?.arrayBuffer().then((val: any) => {
        const storage = getStorage(firebase.app());
        const filenameForDelete =
          "/uploads/" +
          "profitLossBreakdown" +
          houseId +
          `_${year}-${month}-${day}.pdf`;
        const storageref = ref(storage, filenameForDelete);
        // console.log(storageref);
        const uploadTask = uploadBytesResumable(storageref, val);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            // setProgressUpload(progress) // to show progress upload
            switch (snapshot.state) {
              case "paused":
                // console.log("Upload is paused");
                break;
              case "running":
                // console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // message.error(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              //url is download url of file
              // console.log(url);
              s = url
             
            //   submitData["filenameForDelete"] = filenameForDelete;
            //   firebase
            //     .firestore()
            //     .collection("/profitLossBreakdowns")
            //     .doc()
            //     .set(submitData)
            //     .then(() => {
            //       alert("success!");
            //     });
            });
          }
        );
        return s;
      });
      
}

export const getProfitLossBreakdowns = async (houseId: string): Promise<any> => {
    const uid = getUserAuth()
    // console.log(uid)
    const carPartsCollection = await firebase.firestore().collection("profitLossBreakdowns").where("houseId", "==", houseId).orderBy('date', 'desc')
    const carParts = await getDocs(carPartsCollection)
    var list: any = [{}]
    carParts.docs.map((doc, i) => {
        list[i] = doc.data()
        list[i]["id"] = doc.id
    });
    return list
}

export const getProfitLossBreakdowns2 = async (houseId: string): Promise<any> => {
    const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // getMonth() returns month index starting from 0
const day = today.getDate();

    // console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
    let start = new Date(2024 + "-" + 6 + "-" + 29);
    const uid = getUserAuth()
    // console.log(uid)
    const carPartsCollection = firebase.firestore().collection("houseLogs").where("category", "==", 'cleaning').where("date", ">", new Date()).orderBy('date', 'asc')
    const carParts = await getDocs(carPartsCollection)
    var list: any = [{}]
    carParts.docs.map((doc, i) => {
        list[i] = doc.data()
        list[i]["id"] = doc.id
    });
    return list
}

export const getProfitLossBreakdown = async (id: String): Promise<any> => {
    const houseLog = await firebase.firestore().collection("profitLossBreakdowns").doc(id.toString()).get()
    var returnData = houseLog.data()
    return returnData
}

export const updateProfitLossBreakdown = async (id: string, submitData: any): Promise<any> => {
    let status = ''
    await firebase
    .firestore()
    .collection("/profitLossBreakdowns")
    .doc(id)
    .set(submitData)
    .then((_) => {
      status = 'success'
    });
    return status;
}

export const deleteProfitLossBreakdown = async (id: string): Promise<any> => {
    let status = ''
    await firebase
    .firestore()
    .collection("/profitLossBreakdowns")
    .doc(id)
    .delete()
    .then((_) => {
        status = 'success'
      });
      return status;
}


export const getVehicles = async (): Promise<any> => {
    const uid = getUserAuth()
    console.log(uid)
    const carPartsCollection = await firebase.firestore().collection("cars").where("uid", "==", uid).orderBy('date', 'desc')
    const carParts = await getDocs(carPartsCollection)
    var list: any = [{}]
    carParts.docs.map((doc, i) => {
        // console.log(doc.data())
        list[i] = doc.data()
    });
    return list
}

export const createNewVehicle = async (data: any, file?: File): Promise<any> => {
    var status = ''
    if (file) {
        file?.arrayBuffer().then((val) => {
            const storage = getStorage(firebase.app());
            const filenameForDelete =
                "/uploads/" +
                data.carName.replace(" ", "_") +
                  data.uid +
                `_${year}-${month}-${day}.jpg`;
            const storageref = ref(storage, filenameForDelete);
            // console.log(storageref);
            const uploadTask = uploadBytesResumable(storageref, val);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    // setProgressUpload(progress) // to show progress upload
                    switch (snapshot.state) {
                        case "paused":
                            // console.log("Upload is paused");
                            break;
                        case "running":
                            // console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    // message.error(error.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        //url is download url of file
                        // console.log(url);
                        // setDownloadURL(url)
                        // we get the url here, then start updating the logs
                        data['photoLink'] = url;
                        //   submitData["filenameForDelete"] = filenameForDelete;
                        firebase
                        .firestore()
                        .collection("/cars")
                        .doc()
                        .set(data)
                        .then(() => {
                            status = 'success'
                            return 'success'
                        });


                    });
                }
            );

        })
    }else{
        firebase
        .firestore()
        .collection("/cars")
        .doc()
        .set(data)
        .then(() => {
            status = 'success'
            return 'success'
        });
    }


    return status;
}

export const getCarPartsList = async (vehicleId: string): Promise<any> => {
    const uid = getUserAuth()
    // console.log(uid)
    const carPartsCollection = await firebase.firestore().collection("carParts").where("uid", "==", uid).where("vehicleId", "==", vehicleId).orderBy('date', 'desc')
    const carParts = await getDocs(carPartsCollection)
    var list: any = [{}]
    carParts.docs.map((doc, i) => {
        list[i] = doc.data()
    });
    return list
}


export const getHouseList = async (): Promise<any> => {
    const uid = await getUserAuth()
    console.log(uid)
    var housesCollection = await firebase.firestore().collection("houses").where("user_id", "==", uid)
    if (uid == "bA3XYEhRLxPbAj7DeJpQOvHNXYA3"){
        housesCollection = await firebase.firestore().collection("houses") // superadmin
    }else{
    }
    
    
    const houses = await getDocs(housesCollection)
    var list: any = [{}]
    houses.docs.map((doc, i) => {
        list[i] = doc.data()
    });
    // console.log(list)
    return list
}

export const getHouseDetails = async (houseId: String): Promise<any> => {
    const housesCollection = await firebase.firestore().collection("houses").doc(houseId.toString()).get()
    var returnData = housesCollection.data()
    return returnData
}

export const getHouseLogById = async (houseId: String): Promise<any> => {
    const houseLog = await firebase.firestore().collection("houseLogs").doc(houseId.toString()).get()
    var returnData = houseLog.data()
    return returnData
}

export const getHouseLogsOnDateRange = async (
    houseId: String,
    selectedMonth: number,
    selectedYear: number): Promise<any> => {
console.log(houseId)
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
    console.log(getDocs(houseLogs));
    var list: any = [{}]
    houseLogsVal.docs.map((doc, i) => {
        list[i] = doc.data()
        list[i]['id'] = doc.id // manual update the id here
    });

    return list
}

export const getCarLogsOnDateRange = async (
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

    const houseLogsCollection = firebase.firestore().collection("carParts");
    const houseLogs = houseLogsCollection
        .where("vehicleId", "==", houseId)
        .where("date", ">", start)
        .where("date", "<", end);
    const houseLogsVal = await getDocs(houseLogs);
    var list: any = [{}]
    houseLogsVal.docs.map((doc, i) => {
        list[i] = doc.data()
        list[i]['id'] = doc.id // manual update the id here
    });
    // console.log(list)
    return list
}

export const deleteHouseLog = async (houseId: string): Promise<any> => {
    var status;
    firebase
        .firestore()
        .collection("/houseLogs")
        .doc(houseId)
        .delete().then((val: any) => {
            // console.log(val)
            status = val
        })
    return status;
}

export const getLatestThreeArticle = async (): Promise<any> => {
    const articles = await firebase.firestore().collection("articles")
    const getArticles = await getDocs(articles)
    var list: any = [{}]
    getArticles.docs.map((doc, i) => {
        list[i] = doc.data()
        list[i]['id'] = doc.id // manual update the id here
    });
    return list;
} 

export const getArticleDetails = async (articleId: String): Promise<any> => {
    const articlesCollection = await firebase.firestore().collection("articles").doc(articleId.toString()).get()
    var returnData = articlesCollection.data()
    return returnData;
}
