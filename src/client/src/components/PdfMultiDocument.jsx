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
            left: "40px",
            top: "260px",
            color: "#444",
            width: "200px",
            textAlign: "center",
        },
        qrcodeSmall: {
            position: "absolute",
            left: "106px",
            width: "92px",
            top: "142px",
            zIndex: 100,
        },
        bunnySmall: {
            position: "absolute",
            width: "180px",
            left: "60px",
            zIndex: 999,
            top: "20px",
        },
    });

    const renderBunnies = (firstIndex, lastIndex) => {
        const returnBunnies = [];
        let row = 0;
        let col = 0;
        for (let bunnyIndex = firstIndex; bunnyIndex < lastIndex; bunnyIndex++) {
            if (col === 2) {
                col = 0;
                row += 1;
            }
            if (bunnies[bunnyIndex]) {
                returnBunnies.push(
                    <View
                        key={bunnyIndex}
                        style={{
                            position: "absolute",
                            left: `${col * 50}%`,
                            top: `${row * 33}%`,
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

        const bunniesPerPage = 6;
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
