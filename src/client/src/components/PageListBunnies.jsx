import React from "react";
import Navigation from "./Navigation";
import BackBar from "./BackBar";
import ListBunnies from "./ListBunnies";
import ContentWrapper from "./ContentWrapper";
import ItemMenu from "./ItemMenu";
import PrintIcon from "@mui/icons-material/Print";
import { useHistory } from "react-router-dom";

export default function PageListBunnies({ user, times }) {
    const history = useHistory();

    const handlePrintAllClicked = () => {
        history.push(`/bunny/printall`);
    };

    return (
        <>
            <BackBar
                title="My Bunnies"
                menu={
                    <ItemMenu
                        item={null}
                        menuItems={[
                            {
                                title: "Print All",
                                icon: <PrintIcon fontSize="small" />,
                                onClick: handlePrintAllClicked,
                            },
                        ]}
                    />
                }
            ></BackBar>
            <ContentWrapper scrollable>
                <ListBunnies user={user} times={times}></ListBunnies>
            </ContentWrapper>
            <Navigation></Navigation>
        </>
    );
}
