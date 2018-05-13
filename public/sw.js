console.log('service worker');

importScripts('./idb.js');
importScripts('./store.js');

self.addEventListener('sync', function(event) {
    console.log('hello22222');
	event.waitUntil(
		store.outbox('readonly').then(function(outbox) {
			return outbox.getAll();
		}).then(function(messages) {
			return Promise.all(messages.map(function(message) {
				return API_AddRecord( message ).then(function(response) {
					return response;
				}).then(function(data) {
                    console.log('hello');
                    console.log("Status " + data.status);
					if (data.status == 200) {
						return store.outbox('readwrite').then(function(outbox) {
							return outbox.delete(message.id);
						});
					}
				})
			}))
		}).catch(function(err) {
            console.log('error');
			console.error(err);
		})
	);
})




function API_AddRecord( data ) {
    return fetch( 'https://mcftech.quickbase.com/db/bnnv2htnq', {
        method: 'POST',
        body: `
            <qdbapi>
                <usertoken></usertoken>
                <apptoken></apptoken>
                <field fid="6">${data.text1}</field>
                <field fid="7">${data.text2}</field>
                <field fid="8">${data.text3}</field>
            </qdbapi>
        `,
        headers: {
            'Content-Type': 'application/xml',
            'QUICKBASE-ACTION': 'API_AddRecord'
        }
    })
}
