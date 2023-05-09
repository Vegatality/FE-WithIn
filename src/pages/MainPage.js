import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { MainProfileList } from "../components/MainPage/MainProfileList";
import { MainProfileCard } from "../components/MainPage/MainProfileCard";
import { EventSection } from "../components/MainPage/EventSection";
import { EventSectionCard } from "../components/MainPage/EventSectionCard";
import { useSelector } from "react-redux";

export const MainPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const { role } = useSelector((store) => store.auth);

    // const token = Cookies.get("access");
    // console.log(token);

    // const getUserList = async () => {
    //     const response = await axios.get("/members");
    //     console.log("user list", response.data);
    // };
    // const getBoardList = async () => {
    //     const response = await axios.get("/boards");
    //     console.log("board list", response.data);
    // };
    // const getOneUserList = async () => {
    //     const response = await axios.get("/members/1");
    //     console.log("user", response.data);
    // };
    // getUserList();
    // getOneUserList();
    // getBoardList();

    useEffect(() => {
        if (role === "ADMIN") {
            setIsAdmin(role);
        }
    }, [role]);

    return (
        <div className="bg-backgroundPurple">
            <MainProfileList>
                <MainProfileCard />
            </MainProfileList>
            {isAdmin && <button>모달버튼</button>}
            <EventSection>
                <EventSectionCard>test</EventSectionCard>
            </EventSection>
        </div>
    );
};
