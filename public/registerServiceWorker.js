$(document).ready(()=>{

    /*
        Registering the service worker
     */
    // Check that service workers are registered
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js').then(function(reg) {
                if( 'sync' in reg ) {
                    //do stuff here

                    //form submittal
                    $('#submit-form').on('click', (event)=>{
                        var data = getFormData();
                        console.log(data);

                        //create messages database
                        store.outbox('readwrite').then(function(outbox) {
                            return outbox.put(data);
                        }).then(function() {
                            // register for sync and clean up the form
                            clearForm();
                            return reg.sync.register('outbox');
                        });
                    });//end form submittal

                }
            }).catch(function(err) {
                console.log(err);
            });
        });
    }//end register





    function getFormData() {
        const text1 = $('#text1').val();
        const text2 = $('#text2').val();
        const text3 = $('#text3').val();

        var data = {
            text1,
            text2,
            text3
        };

        return data;
    }

    function clearForm() {
        console.log('helloRyan');
        $('#text1').val('');
        $('#text2').val('');
        $('#text3').val('');
    }

});
