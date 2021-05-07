const app = new Vue({
    el: "#app",
    data: {
        usersList: [
            {
                name: 'Michele',
                avatar: 'imgs/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '13/08/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: 'imgs/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            }, {
                name: 'Samuele',
                avatar: 'imgs/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: 'imgs/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },


        ],
        userSelect: {},
        messageText: "",
        inputNewMessage: "",
        userSearch: "",
    },

    // ********************
    computed: {
        selectedLastMessage() {
            if (!this.userSelect.messages) {
                return "";
            };

            const recivMess = this.userSelect.messages.filter((mess) => mess.status === "received");

            const lastMessDate = recivMess[recivMess.length - 1].date;
            return this.messegeTime(lastMessDate)
        },


        filtredUsers() {
            return this.usersList.filter((ricerca) => {
                return ricerca.name.toLowerCase().includes(this.userSearch.toLowerCase())
            });
        },



    },

    // ******************
    methods: {
        userClick(user) {
            this.userSelect = user
        },


        autoScroll() {
            this.$nextTick(() => {
                const elementHtml = this.$refs.toScroll;

                elementHtml.scrollTop = elementHtml.scrollHeight
                console.log(elementHtml);
            });
        },


        messegeTime(date) {
            return moment(date, "DD/MM/YYYY  HH:mm:ss").format("HH:mm");
        },


        // messagi inseriti dal utente con la risposta "ciao "
        addInputUserMessage() {
            if (!this.inputNewMessage) {
                return "";
            }

            const newMessage = {
                date: moment().format("DD/MM/YYYY HH:mm:ss"),
                text: this.inputNewMessage,
                status: 'sent'
            };

            const userSelect = this.userSelect;

            userSelect.messages.push(newMessage);
            this.inputNewMessage = "";

            this.autoScroll();




            // setTimeout( 2000)
            setTimeout(() => {
                const aiResponse = {
                    date: moment().format("DD/MM/YYYY HH:mm:ss"),
                    text: "ciao",
                    status: 'received'
                };
                userSelect.messages.push(aiResponse)
                this.autoScroll();
            }, 2000);
        },
        
        getLastMes(message) {
            if (message.length === 0) {
                return "no messeges"
            }

            const lastMsg = message[message.length - 1]
            const messegeTime = this.messegeTime(lastMsg.date)

            let trimmMess = lastMsg.text.slice(0, 15);

            if (lastMsg.text.length > 15) {
                trimmMess += "..."
            }
            return trimmMess + " " + messegeTime
        },


    },



    mounted() {
        this.userSelect = this.usersList[0]
    },

})