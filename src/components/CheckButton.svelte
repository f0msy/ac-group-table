<script>
    import { checkTableData } from '../services/data.service.js'
    import { dataLoading } from '../stores/data.store'
    import { onMount } from 'svelte';

    // onMount(() => {
    //     checkTableData();
    // })
</script>

    <button on:click={checkTableData} disabled="{dataLoading}" class="ac-table-btn">
        <svg width="35px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.65002 12.0001C3.65002 7.38852 7.38845 3.6501 12 3.6501C14.6678 3.6501 17.044 4.90092 18.5732 6.8501L15 6.8501L15 8.1501L20 8.1501L20.65 8.1501L20.65 7.5001L20.65 2.5001L19.35 2.5001L19.35 5.74692C17.5806 3.66918 14.9446 2.3501 12 2.3501C6.67048 2.3501 2.35002 6.67055 2.35002 12.0001L3.65002 12.0001ZM20.35 12.0001C20.35 16.6117 16.6116 20.3501 12 20.3501C9.33222 20.3501 6.95629 19.0994 5.42684 17.1501L9.00003 17.1501L9.00003 15.8501L4.00002 15.8501L3.35002 15.8501L3.35002 16.5001L3.35003 21.5001L4.65003 21.5001L4.65003 18.2533C6.41934 20.3309 9.05551 21.6501 12 21.6501C17.3296 21.6501 21.65 17.3296 21.65 12.0001L20.35 12.0001Z" fill="currentColor"></path>
        </svg>
         <div class="ac-table-btn-name">Пересчитать</div>
    </button>


<style>
    .ac-table-btn {
        width: 150px;
        height: 40px;
        border-radius: 8px;
        margin: 10px 0;
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