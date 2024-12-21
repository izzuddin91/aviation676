// file to create all the basic firebase function
// create read update delete 
"use client";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../clientApp";
import "firebase/compat/firestore";
import { useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import { getUserAuth } from "@/app/util/auth.util";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { format } from "date-fns";
import 'firebase/firestore';
import 'firebase/storage';
import { deleteObject } from "firebase/storage";
import {  doc, getDoc, deleteDoc } from "firebase/firestore";
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
    // const uid = getUserAuth()
    const uid = "bA3XYEhRLxPbAj7DeJpQOvHNXYA3"
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
    // const uid = getUserAuth()
    const uid = "bA3XYEhRLxPbAj7DeJpQOvHNXYA3"
    // console.log(uid)
    const carPartsCollection = await firebase.firestore().collection("carParts").where("uid", "==", uid).where("vehicleId", "==", vehicleId).orderBy('date', 'desc')
    const carParts = await getDocs(carPartsCollection)
    var list: any = [{}]
    carParts.docs.map((doc, i) => {
        list[i] = doc.data()
    });
    return list
}


export const getHouseList = async (role: string): Promise<any> => {
    const uid = await getUserAuth(); // Get user ID
    let housesQuery;
  
    if (role === "admin") {
      // Admin: Get all houses
      housesQuery = collection(firebase.firestore(), "houses");
    } else {
      // Regular user: Get houses matching their UID
      housesQuery = query(
        collection(firebase.firestore(), "houses"),
        where("userId", "==", uid)
      );
    }
  
    const housesSnapshot = await getDocs(housesQuery); // Fetch the data
    const list: any[] = housesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  
    return list; // Return as an array
  };

export const getHouse = async (houseId: String): Promise<any> => {
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

export const getAdminById = async (uid: String): Promise<any> => {
    const houseLog = await firebase.firestore().collection("admins").doc(uid.toString()).get()
    var returnData = houseLog.data()

    const carPartsCollection = await firebase.firestore().collection("admins").where("uid", "==", uid)
    const carParts = await getDocs(carPartsCollection)
    var list: any = [{}]
    carParts.docs.map((doc, i) => {
        // console.log(doc.data())
        list[i] = doc.data()
    });
    console.log(list)
    return list[0]
}

export const getAddOnList = async (): Promise<any> => {
    
    const addOns = await firebase.firestore().collection("addOns")
    const getAddOns = await getDocs(addOns)
    var list: any = [{}]
    getAddOns.docs.map((doc, i) => {
        list[i] = doc.data()
        list[i]['id'] = doc.id // manual update the id here
    });
    return list;
} 

// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// import firebase from "firebase/app"; // Assuming Firebase is already initialized

export const saveAddOn = async ({
  title,
  description,
  price,
  photo,
}: {
  title: string;
  description: string;
  price: string;
  photo: File;
}): Promise<void> => {
  try {
    // Initialize Firebase Storage and Firestore
    const storage = getStorage(firebase.app());
    const firestore = getFirestore(firebase.app());

    // Create a storage reference for the photo
    const storageRef = ref(storage, `uploads/${photo.name}`);

    // Upload the photo
    const uploadTask = await uploadBytesResumable(storageRef, photo);
    const photoUrl = await getDownloadURL(uploadTask.ref);

    // Save add-on data to Firestore
    const addOnsCollection = collection(firestore, "addOns");
    await addDoc(addOnsCollection, {
      title,
      description,
      price: parseFloat(price),
      imageUrl: photoUrl,
      createdAt: serverTimestamp(),
    });

    console.log("Add-On saved successfully!");
  } catch (error) {
    console.error("Error saving add-on:", error);
    throw error;
  }
};


export const deleteAddOn = async (id: string): Promise<string> => {
  let status = '';

  try {
    const db = getFirestore();
    const storage = getStorage();

    // Get the document reference
    const docRef = doc(db, "addOns", id);
    const docSnap = await getDoc(docRef); // Correct use of `await`

    if (docSnap.exists()) {
      const data = docSnap.data();
      const imageUrl = data?.imageUrl;

      if (imageUrl) {
        // Decode the file path
        const filePath = decodeURIComponent(imageUrl.split('/o/')[1]?.split('?')[0]);

        // Create a reference to the file in Firebase Storage
        const storageRef = ref(storage, filePath);

        // Delete the file from Firebase Storage
        await deleteObject(storageRef); // Properly awaited
              // Delete the document from Firestore
      await deleteDoc(docRef); // Properly awaited
      }


      status = 'success';
    } else {
      status = 'document_not_found';
    }
  } catch (error) {
    console.error('Error deleting add-on:', error);
    status = 'error';
  }

  return status; // Return the final status
};

export const getHouseDetails = async (houseId: String): Promise<any> => {
    const snapshot = await firebase.firestore().collection("houseDetails").where("houseId", "==", houseId).get()
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(data)
    return data
}

export const addHouseDetail = async (key: string, value: string, houseId: string): Promise<any> => {
    const newDetail = { key, value, houseId };
  
    // Add the new detail to the Firestore collection
    const docRef = await firebase.firestore().collection("houseDetails").add(newDetail);
  
    // Return the newly created detail with its generated Firestore ID
    return { id: docRef.id, ...newDetail };
  };

  export const addOrder = async (
    selectedItems: { id: string; quantity: number }[],
    items: { id: string; title: string; price: number }[],
    totalPrice: number,
    notes: string,
    selectedDate: Date | null
  ): Promise<void> => {
    try {
      // Map selectedItems to include product details
      const orderItems = selectedItems.map((item) => {
        const product = items.find((i) => i.id === item.id);
        return {
          title: product?.title || "Unknown Item",
          quantity: item.quantity,
          price: product?.price || 0,
        };
      });
  
      // Add order to Firestore
      await firebase.firestore().collection('order').add({
        items: orderItems,
        totalPrice,
        notes,
        selectedDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
        timestamp: new Date(),
      })
    } catch (error) {
      console.error("Error adding order to Firestore:", error);
      throw new Error("Failed to place the order.");
    }
  };


