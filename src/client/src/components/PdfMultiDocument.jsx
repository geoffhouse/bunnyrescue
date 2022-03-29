import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

export default function PdfDocument({ bunnies }) {
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#ffffff",
        },
        bunnyText: {
            position: "absolute",
            fontSize: 8,
            left: "0px",
            top: "180px",
            color: "#444",
            width: "200px",
            textAlign: "center",
        },
        qrcodeSmall: {
            position: "absolute",
            left: "72px",
            width: "60px",
            top: "92px",
            zIndex: 100,
        },
        bunnySmall: {
            position: "absolute",
            width: "120px",
            left: "40px",
            zIndex: 999,
            top: "10px",
        },
    });

    const renderBunnies = (firstIndex, lastIndex) => {
        const returnBunnies = [];
        let row = 0;
        let col = 0;
        for (let bunnyIndex = firstIndex; bunnyIndex < lastIndex; bunnyIndex++) {
            if (col === 3) {
                col = 0;
                row += 1;
            }
            if (bunnies[bunnyIndex]) {
                returnBunnies.push(
                    <View
                        key={bunnyIndex}
                        style={{
                            position: "absolute",
                            left: `${col * 33}%`,
                            top: `${row * 25}%`,
                        }}
                    >
                        <View style={styles.bunnySmall}>
                            <Image src={`/bunnies/bunny-bw.png`} />
                        </View>
                        <View style={styles.qrcodeSmall}>
                            <Image src={bunnies[bunnyIndex].qrCode} />
                        </View>
                        <View>
                            <Text style={styles.bunnyText}>Bunny name: {bunnies[bunnyIndex].name}</Text>
                        </View>
                    </View>
                );
                col += 1;
            }
        }
        return returnBunnies;
    };

    const renderPages = () => {
        const pages = [];

        const bunniesPerPage = 12;
        const pageCount = Math.floor(bunnies.length / bunniesPerPage);
        for (let page = 0; page < pageCount + 1; page++) {
            const firstIndex = page * bunniesPerPage;
            let lastIndex = firstIndex + bunniesPerPage;
            if (lastIndex > bunnies.length) {
                lastIndex = bunnies.length;
            }
            pages.push(
                <Page size="A4" style={styles.page} key={page}>
                    {renderBunnies(firstIndex, lastIndex)}
                </Page>
            );
        }
        return pages;
    };

    return <Document>{renderPages()}</Document>;
}
