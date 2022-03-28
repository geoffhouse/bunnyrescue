import React from "react";
import { styled } from "@mui/material/styles";
import Loading from "./Loading";
import FetchGet from "../services/FetchGet";
import DOMPurify from "dompurify";

const Title = styled("h3")(() => ({
    marginBottom: "0.4rem",
    marginTop: "1rem",
}));

const Text = styled("p")(() => ({
    marginBottom: "0.4rem",
    marginTop: "0.4rem",
}));

export default function TemplatedContent({ templateName }) {
    const [content, setContent] = React.useState([]);

    React.useEffect(() => {
        const fetchContent = async () => {
            const url = `/api/template/${templateName}`;
            try {
                const result = await FetchGet(url);
                if (result && result.status === "success") {
                    setContent(result.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchContent();
    }, [templateName]);

    if (!content) {
        return <Loading />;
    }
    return (
        <>
            {content.map((item, index) => (
                <div key={index}>
                    <Title>{item.name}</Title>
                    {item.content.map((contentItem, contentIndex) => (
                        <Text key={contentIndex}>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentItem) }} />
                        </Text>
                    ))}
                </div>
            ))}
        </>
    );
}
