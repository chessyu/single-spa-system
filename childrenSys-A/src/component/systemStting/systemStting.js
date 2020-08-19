

export default{
    name:'systemStting',
    data(){
        return{
           
        }
    },
    props:{
        openThemeConf:{
            type:Boolean,
            default: false,
        }
    },
    methods:{
        themeSelect(event){
            let theme = event.currentTarget.getAttribute("name");
            localStorage.setItem('theme',theme);
            document.body.className = theme;
        },
    },
    computed:{
        flage:{
            get(){
                return this.openThemeConf;
            },
            set(val){
                this.$emit('close',this.flage)
            }
        },
    }
    
}