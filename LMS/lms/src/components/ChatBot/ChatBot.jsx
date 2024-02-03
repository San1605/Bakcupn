import React, { useEffect } from 'react'
import "./ChatBot.css"
import { useState } from 'react'
import { useRef } from 'react'
const ChatBot = () => {
    const messageContainerRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false)
    const conversationChat = [
        { role: 'user', text: 'Hello, bot. How are you today?' },
        { role: 'bot', text: "I'm just a computer program, so I don't have feelings, but I'm here to help you." },
        { role: 'user', text: "That's good to know. Can you provide information on web development?" },
        { role: 'bot', text: "Of course! Web development encompasses a wide range of skills and technologies, including HTML, CSS, JavaScript, and various frameworks like React. Is there a specific aspect you'd like to know more about?" },
        { role: 'user', text: "I'm particularly interested in React.js. Can you explain its core concepts?" },
        { role: 'bot', text: "Certainly! React.js is a JavaScript library for building user interfaces. It's known for its component-based architecture. React allows you to create reusable UI components and efficiently update the DOM. Some core concepts include components, props, state, and the virtual DOM." },
        { role: 'user', text: "That's helpful. How can I improve the performance of my React app?" },
        { role: 'bot', text: "To optimize React app performance, you can use techniques like code splitting, lazy loading, and minimizing unnecessary renders by using shouldComponentUpdate or React.memo. Also, consider using state management libraries like Redux or Mobx for efficient data handling." },
        { role: 'user', text: "Great tips! Do you have any recommendations for CSS frameworks?" },
        { role: 'bot', text: "There are several popular CSS frameworks, such as Bootstrap, Foundation, and Bulma. Your choice depends on your project's requirements. Bootstrap is widely used and offers a lot of pre-designed components." },
        { role: 'user', text: "Thanks for the info. I'll check them out. Any advice for a novice web developer?" },
        { role: 'bot', text: "For beginners, I'd recommend focusing on HTML, CSS, and JavaScript fundamentals. Practice building simple projects, gradually increase complexity, and don't hesitate to seek help from online resources, forums, and tutorials." },
        { role: 'user', text: "I appreciate your guidance. You're very knowledgeable. Any last thoughts?" },
        { role: 'bot', text: "Thank you for your kind words! Feel free to return anytime you have questions. Keep learning and exploring the world of web development. Have a great day!" },
        { role: 'user', text: "Hello again. I have a question about responsive web design." },
        { role: 'bot', text: "Sure, I can help with that. Responsive web design is an approach that makes web pages look good on all devices and screen sizes. It involves using media queries and flexible layouts to adapt to different screen sizes." },
    ]
    const [chatArr, setChatArr] = useState([])
    const [index, setIndex] = useState(0);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        if (index < conversationChat.length - 1) {
            const messages = conversationChat[index];
            const words = messages.text.split(' ');
            let wordLength = 0;
            setChatArr((prev) => [...prev, { ...messages, text: '' }]);

            const wordInterval = setInterval(() => {
                if (wordLength < words.length - 1) {
                    setChatArr((prev) => {
                        const updatedMessages = [...prev];
                        updatedMessages[prev.length - 1].text += words[wordLength] + " "
                        return updatedMessages
                    })
                    scrollToBottom()
                    wordLength++;
                }
                else {
                    clearInterval(wordInterval);
                    if (messages.role === 'user') {
                        setIsTyping(true);
                        setTimeout(() => {
                            setIndex((prev) => prev + 1)
                            setIsTyping(false)
                        }, 1000)
                    }
                    else {
                        setIndex((prev) => prev + 1)
                    }

                }
            }, 300)
        }
    }, [index])

    return (
        <div className='OuterDiv'>
            <button>toggle</button>
            <div className='innerDiv'
                ref={messageContainerRef}>
                {
                    chatArr?.map((item) => (
                        <div className={`messageDiv ${item?.role === "user" ? "rightMessage" : "leftmessage"} `}>
                            <div className='message'>{
                                item.text
                            }</div>
                        </div>
                    ))
                }
                {isTyping && <div className="bot-message">Bot is typing...</div>}
            </div>

        </div>
    )
}
export default ChatBot