import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts if needed
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf' }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#1a2744',
        textDecoration: 'underline'
    },
    section: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        overflow: 'hidden'
    },
    sectionHeader: {
        backgroundColor: '#1a2744',
        padding: 8,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        padding: 6
    },
    label: {
        width: '35%',
        fontSize: 9,
        fontWeight: 'bold',
        color: '#333333'
    },
    value: {
        width: '65%',
        fontSize: 9,
        color: '#555555'
    },
    subHeader: {
        backgroundColor: '#f0f0f0',
        padding: 6,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1a2744'
    },
    familyMemberSection: {
        marginBottom: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#c8a97e',
        borderRadius: 3,
        backgroundColor: '#fffbe8'
    },
    familyMemberTitle: {
        backgroundColor: '#5c3a1e',
        color: '#f5e6c8',
        padding: 4,
        fontSize: 9,
        fontWeight: 'bold',
        marginBottom: 6
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#999999'
    }
});

interface FamilyMember {
    id: number;
    name: string;
    ppNo: string;
    doi: string;
    doe: string;
    poi: string;
    dob: string;
    nominee: string;
    relation: string;
}

interface FormState {
    firstName: string;
    middleName: string;
    lastName: string;
    sex: string;
    dateOfBirth: string;
    age: string;
    cellNo: string;
    address: string;
    landmark: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
    passportNumber: string;
    dateOfIssue: string;
    dateOfExpiry: string;
    placeOfIssue: string;
    purposeOfTravel: string;
    anyExistingIllness: string;
    includeUSACanada: boolean;
    excludeUSACanada: boolean;
    dateOfTravel: string;
    returnDate: string;
    noOfDays: string;
    countriesToVisit: string;
    sumInsured: string;
    nomineeName: string;
    nomineeRelationship: string;
    nomineeAge: string;
    nomineeMobile: string;
    declaration: boolean;
}

interface InsuranceProposalPDFProps {
    formData: FormState;
    familyMembers: FamilyMember[];
}

const InsuranceProposalPDF: React.FC<InsuranceProposalPDFProps> = ({ formData, familyMembers }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Insurance Proposal Form</Text>
                
                {/* Personal Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Personal Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Full Name:</Text>
                        <Text style={styles.value}>{formData.firstName} {formData.middleName} {formData.lastName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Sex:</Text>
                        <Text style={styles.value}>{formData.sex || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date of Birth:</Text>
                        <Text style={styles.value}>{formData.dateOfBirth || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Age:</Text>
                        <Text style={styles.value}>{formData.age || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Cell Number:</Text>
                        <Text style={styles.value}>{formData.cellNo || '-'}</Text>
                    </View>
                </View>

                {/* Address Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Address Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>{formData.address || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Landmark:</Text>
                        <Text style={styles.value}>{formData.landmark || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>City:</Text>
                        <Text style={styles.value}>{formData.city || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pincode:</Text>
                        <Text style={styles.value}>{formData.pincode || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>State:</Text>
                        <Text style={styles.value}>{formData.state || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Country:</Text>
                        <Text style={styles.value}>{formData.country || '-'}</Text>
                    </View>
                </View>

                {/* Passport Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Passport Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Passport Number:</Text>
                        <Text style={styles.value}>{formData.passportNumber || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date of Issue:</Text>
                        <Text style={styles.value}>{formData.dateOfIssue || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date of Expiry:</Text>
                        <Text style={styles.value}>{formData.dateOfExpiry || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Place of Issue:</Text>
                        <Text style={styles.value}>{formData.placeOfIssue || '-'}</Text>
                    </View>
                </View>

                {/* Travel Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Travel Information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Purpose of Travel:</Text>
                        <Text style={styles.value}>{formData.purposeOfTravel || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Any Existing Illness:</Text>
                        <Text style={styles.value}>{formData.anyExistingIllness || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Travel Coverage:</Text>
                        <Text style={styles.value}>
                            {formData.includeUSACanada && 'Including USA/Canada '}
                            {formData.excludeUSACanada && 'Excluding USA/Canada '}
                            {!formData.includeUSACanada && !formData.excludeUSACanada && '-'}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date of Travel:</Text>
                        <Text style={styles.value}>{formData.dateOfTravel || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Return Date:</Text>
                        <Text style={styles.value}>{formData.returnDate || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Number of Days:</Text>
                        <Text style={styles.value}>{formData.noOfDays || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Countries to Visit:</Text>
                        <Text style={styles.value}>{formData.countriesToVisit || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Sum Insured (USD):</Text>
                        <Text style={styles.value}>{formData.sumInsured || '-'}</Text>
                    </View>
                </View>

                {/* Nominee Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Nominee Details</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nominee Name:</Text>
                        <Text style={styles.value}>{formData.nomineeName || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Relationship:</Text>
                        <Text style={styles.value}>{formData.nomineeRelationship || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Age:</Text>
                        <Text style={styles.value}>{formData.nomineeAge || '-'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mobile Number:</Text>
                        <Text style={styles.value}>{formData.nomineeMobile || '-'}</Text>
                    </View>
                </View>

                {/* Family Members Section */}
                {familyMembers.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Family Members Travelling</Text>
                        {familyMembers.map((member, index) => (
                            <View key={member.id} style={styles.familyMemberSection}>
                                <Text style={styles.familyMemberTitle}>Member #{index + 1}</Text>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Name:</Text>
                                    <Text style={styles.value}>{member.name || '-'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Passport Number:</Text>
                                    <Text style={styles.value}>{member.ppNo || '-'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Date of Issue:</Text>
                                    <Text style={styles.value}>{member.doi || '-'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Date of Expiry:</Text>
                                    <Text style={styles.value}>{member.doe || '-'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Place of Issue:</Text>
                                    <Text style={styles.value}>{member.poi || '-'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Date of Birth:</Text>
                                    <Text style={styles.value}>{member.dob || '-'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Nominee:</Text>
                                    <Text style={styles.value}>{member.nominee || '-'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Relationship:</Text>
                                    <Text style={styles.value}>{member.relation || '-'}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Declaration */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Declaration</Text>
                    <View style={styles.row}>
                        <Text style={styles.value}>
                            {formData.declaration ? '✓ I confirm that the information provided is correct to the best of my knowledge' : '✗ Declaration not accepted'}
                        </Text>
                    </View>
                </View>

                <Text style={styles.footer}>
                    Generated on {new Date().toLocaleString()} | Insurance Proposal Form
                </Text>
            </Page>
        </Document>
    );
};

export default InsuranceProposalPDF;