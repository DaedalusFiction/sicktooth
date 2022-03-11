import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function useGetStories(maxNumber) {
    const [stories, setStories] = useState(null);

    useEffect(() => {
        console.log("running getStories");
        async function getStories() {
            const q = query(
                collection(db, "stories"),
                orderBy("createdAt", "desc"),
                limit(maxNumber)
            );

            const docsSnap = await getDocs(q);
            let newStories = [];
            docsSnap.docs.forEach((doc, index) => {
                newStories = [...newStories, doc.data()];
                // console.log(doc.data());
            });
            setStories(newStories);
        }

        getStories();
    }, [maxNumber]);

    return stories;
}

export default useGetStories;
