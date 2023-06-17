



//Creating straming sources with streaming data
const createStreaming = ( matchData ) => {

    let streamingData = [];
    // let streamRestricted = [];

       // Check Restricted
       matchData?.streamingSources?.map(source => {

        // if(source?.streamType === 'Restricted'){
        //     streamRestricted = [];
        //     source?.headers?.map(data =>{
        //         streamRestricted.push({
        //             name: data.name,
        //             value: data.value
        //         })
        //     })
        // }

        streamingData.push({
            streamTitle: source?.streamTitle,
            streamType: source?.streamType,
            resulation: source?.resulation,
            platform: source?.platform,
            isPremium: source?.isPremium,
            portraitWatermark: source?.portraitWatermark,
            landscapeWatermark: source?.landscapeWatermark,
            streamUrl: source?.streamUrl,
            headers: source?.headers,
            streamKey: source?.streamKey
        });
    });
    return streamingData;
}


module.exports = {
    createStreaming
}










// //Creating straming sources with streaming data
// const createStreaming = ( matchData ) => {

//     let streamingData = [];
//     let streamRestricted = [];

//        // Check Restricted
//        matchData?.streamingSources?.map(source => {

//         if(source?.streamType === 'Restricted'){
//             streamRestricted = [];
//             source?.streamRestrictedData?.map(data =>{
//                 streamRestricted.push({
//                     name: data.name,
//                     value: data.value
//                 })
//             })
//         }

//         streamingData.push({
//             streamTitle: source?.streamTitle,
//             streamType: source?.streamType,
//             resulation: source?.resulation,
//             platform: source?.platform,
//             isPremium: source?.isPremium,
//             portraitWatermark: source?.portraitWatermark,
//             landscapeWatermark: source?.landscapeWatermark,
//             streamUrl: source?.streamUrl,
//             headers: source?.headers,
//             streamKey: source?.streamKey,
//             streamRestrictedData: source?.streamType === "Restricted" ? JSON.stringify(streamRestricted) : ""
//         });
//     });
//     return streamingData;
// }


// module.exports = {
//     createStreaming
// }