import React, { FC, JSX } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

const searchResults = [
    { id: '1', primary: 'Quận 9', distance: '2.1 km', secondary: 'Quận 9' },
    { id: '2', primary: 'SimCity Premier Quận 9 Anpha Holdings', distance: '0.7 km', secondary: '100 Lò Lu, Phường Trường Thạnh, Quận 9, Ho...' },
    { id: '3', primary: 'Dinh Độc Lập - Thành phố Hồ Chí Minh', distance: '6.1 km', secondary: 'Dinh Độc Lập' },
    { id: '4', primary: 'Biên Hòa', distance: '14.5 km', secondary: '' },
    { id: '5', primary: 'Nhà phố Biệt thự Simcity Quận 9', distance: '<0.1 km', secondary: 'Đường Số 4, Lò Lu, Phường Trường Thạnh,...' },
    { id: '6', primary: 'Vinhomes Grand Park Quận 9', distance: '2.6 km', secondary: 'Vinhomes, 350 Nguyễn Xiển, Phường Long T...' },
    { id: '7', primary: 'The Global City', distance: '4.9 km', secondary: 'Đỗ Xuân Hợp, Thủ Đức' },
    { id: '8', primary: 'The Brix', distance: '8.6 km', secondary: '26 Tran Ngoc Dien, Thao Dien, District 2, Ho...' },
    { id: '9', primary: 'Mia Saigon - Luxury Boutique Hotel', distance: '7.3 km', secondary: '2-4 Street 10, An Phu, Thu Duc City, Ho Chi M...' },
    { id: '10', primary: 'Phường Trường Thạnh', distance: '1.6 km', secondary: '' },
    { id: '11', primary: 'Phùng Coffee', distance: '<0.1 km', secondary: 'Số 07-N5, khu Đô thị Sim City, Đường số 4,...' },
];

const SearchLocationScreen: FC = (): JSX.Element => {
    
    const renderItem = ({ item }: { item: typeof searchResults[0] }) => (
        <TouchableOpacity style={styles.listItem}>
            <View style={styles.primaryRow}>
                <Text style={styles.distanceText}>{item.distance}</Text>
                <Text style={styles.primaryText}>{item.primary}</Text>
            </View>
            {item.secondary ? (
                <Text style={styles.secondaryText}>{item.secondary}</Text>
            ) : (
                <View style={styles.divider} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Cancel pressed')}>
                    <Text style={styles.headerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Next pressed')} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchBarContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm"
                    placeholderTextColor="#888"
                />
            </View>

            <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.listContainer}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

export default SearchLocationScreen;