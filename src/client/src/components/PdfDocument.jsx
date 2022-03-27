import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

export default function PdfDocument({ size, qrcode, bunnyName }) {
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#ffffff",
        },
        bunny: {
            position: "absolute",
            fontSize: 12,
            left: "10px",
            top: "820px",
            color: "#000000",
        },
        qrcodeSmall: {
            position: "absolute",
            left: "75px",
            width: "150px",
            top: "205px",
            zIndex: 100,
        },
        qrcodeMedium: {
            position: "absolute",
            left: "110px",
            width: "210px",
            top: "300px",
            zIndex: 100,
        },
        qrcodeLarge: {
            position: "absolute",
            left: "150px",
            right: "150px",
            top: "400px",
            zIndex: 100,
        },
        bunnySmall: {
            position: "absolute",
            width: "50%",
            height: "50%",
            zIndex: 999,
        },
        bunnyMedium: {
            position: "absolute",
            width: "71%",
            height: "71%",
            zIndex: 999,
        },
        bunnyLarge: {
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 999,
        },
    });

    if (size === "small") {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.bunnySmall}>
                        <Image src={`/bunnies/bunny-bw.png`} />
                    </View>
                    <View style={styles.qrcodeSmall}>
                        <Image src={qrcode} />
                    </View>
                    <View>
                        <Text style={styles.bunny}>{bunnyName}</Text>
                    </View>
                </Page>
            </Document>
        );
    }

    if (size === "medium") {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.bunnyMedium}>
                        <Image src={`/bunnies/bunny-bw.png`} />
                    </View>
                    <View style={styles.qrcodeMedium}>
                        <Image src={qrcode} />
                    </View>
                    <View>
                        <Text style={styles.bunny}>{bunnyName}</Text>
                    </View>
                </Page>
            </Document>
        );
    }

    if (size === "large") {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.bunnyLarge}>
                        <Image src={`/bunnies/bunny-bw.png`} />
                    </View>
                    <View style={styles.qrcodeLarge}>
                        <Image src={qrcode} />
                    </View>
                    <View>
                        <Text style={styles.bunny}>{bunnyName}</Text>
                    </View>
                </Page>
            </Document>
        );
    }
}
