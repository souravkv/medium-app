import axios from "axios";
import { useEffect, useState } from "react";
import { BACKENDURL } from "../../config";


export const useBlogs = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([])


    useEffect(() => {
        console.log("onee oenee 1")

        const request = async () => {

            const res = await axios.get(`${BACKENDURL}/api/v1/book/blog/all`, {
                headers: { Authorization: "bearer " + localStorage.getItem('token') }
            })

            console.log(res)

            setBlogs(res.data.blogs)
            console.log("My" + blogs + "myyyyy")
            setLoading(false)


        }
        request();


    }, [])

    return { loading, blogs }




}