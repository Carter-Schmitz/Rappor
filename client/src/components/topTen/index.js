import { ListItem } from '@chakra-ui/layout';
import React from 'react'



const TopTen = ({friends}) => {
    for (let i = 0; i < friends.length; i++) {
        const friends = friends[i];
        if (11 > friend.topTenRank > 0) {
            return <ListItem key={friend._id}> {friend.username} {friend.topTenRank}</ListItem>
        }
        
    }

}




export default TopTen;