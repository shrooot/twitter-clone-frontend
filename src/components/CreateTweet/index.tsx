import { useEffect, useState } from "react"
import styles from "../../stylesheets/CreateTweet.module.css"
import { errorToast, successToast } from "../../utils/customToast"
import axios from "axios"
import { CREATE_TWEET_ENDPOINT, USERINFO_ENDPOINT } from "../../utils/endpoints"
import { ICreateTweet } from "../../utils/types"

const CreateTweet = () => {
    const [text, setText] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [username, setUsername] = useState("")


    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axios.get(USERINFO_ENDPOINT, { withCredentials: true })
                setUsername(response.data.username)
            } catch (error) {
                errorToast("Error loading user info")
            }
        }
        getUserInfo()
    }, [])

    const handleTweetClick = async () => {
        try {
            if (text === "")
                throw new Error("Please add text to your tweet")
            else {
                const data: ICreateTweet = { text, imgUrl }
                await axios.post(CREATE_TWEET_ENDPOINT, data, { withCredentials: true })
                successToast("Tweet created succesfully", 5000)
                setText("")
                setImgUrl("")
            }
        } catch (error: any) {
            errorToast(error.message)
        }
    }

    return (
        <div className={styles.container}>
            <h2>Create Kwote</h2>
            <div className={styles.createTweetWrapper}>
                <span className={styles.username}>@{username}</span>
                <textarea name="tweet" id="tweet" placeholder="What is happening!?" cols={30} rows={10} value={text} onChange={(e) => { setText(e.target.value) }} className={styles.tweetArea} />
                <label htmlFor="url" style={{ marginBottom: "10px" }}>Image</label>
                <textarea name="url" id="url" placeholder="Add an image URL" cols={30} rows={5} value={imgUrl} onChange={(e) => { setImgUrl(e.target.value) }} className={styles.tweetArea} />

                <button className={styles.tweetButton} onClick={() => { handleTweetClick() }}>
                    Kwote
                </button>

            </div>
        </div>
    )
}

export default CreateTweet
