<script>
    import { setTableData } from '../services/data.service.js'
    import { dataLoading } from '../stores/data.store'
</script>

    <button on:click={setTableData} disabled="{dataLoading}" class="ac-table-btn">
        <svg width="35px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.0001 2.64998C5.25451 2.64998 4.6501 3.25439 4.6501 3.99998V20C4.6501 20.7456 5.25451 21.35 6.0001 21.35H18.0001C18.7457 21.35 19.3501 20.7456 19.3501 20V7.26922L14.7309 2.64998H12.6501V14.4307L15.5405 11.5404L16.4597 12.4596L12.0001 16.9192L7.54048 12.4596L8.45972 11.5404L11.3501 14.4307V2.64998H6.0001ZM3.3501 3.99998C3.3501 2.53642 4.53654 1.34998 6.0001 1.34998H15.2693L20.6501 6.73074V20C20.6501 21.4635 19.4637 22.65 18.0001 22.65H6.0001C4.53654 22.65 3.3501 21.4635 3.3501 20V3.99998Z" fill="currentColor"></path>
        </svg> 
        <div class="ac-table-btn-name">Сохранить</div> 
    </button>


<style>
    .ac-table-btn {
        width: 150px;
        height: 40px;
        border-radius: 8px;
        margin: 10px;
        border: none;
        background-color: #fff;
        color: #404040;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: 500;
        justify-content: center;
    }

    .ac-table-btn:hover{
        background-color: #e5e5e5;
    }

    .ac-table-btn-name {
        padding-right: 0;
    }
</style>