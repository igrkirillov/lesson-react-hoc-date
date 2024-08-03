import {useState, useEffect, FunctionComponent} from 'react';
import './App.css'
import moment from 'moment';

type DateTimeProps = {
    date: string
}

function DateTime(props: DateTimeProps) {
    return (
        <p className="date">{props.date}</p>
    )
}

function withTimePretty(WrappedComponent: FunctionComponent<DateTimeProps>, makeDatePretty: (date:string) => string) {
    return (props:DateTimeProps) => {
        const [state, setState] = useState({} as DateTimeProps)
        useEffect(() => {
            if (state.date !== props.date) {
                setState({
                    date: makeDatePretty(props.date)
                })
            }
        }, [props.date])
        return (<WrappedComponent {...props} {...state}></WrappedComponent>)
    }
}

type VideoProps = {
    url: string
    date: string
}

function Video(props: VideoProps) {
    const DateTimePretty = withTimePretty(DateTime, (date) => {
        const videoDate = moment(date, 'YYYY-MM-DD HH:mm:ss').toDate();
        const nowDate = new Date();
        const diffMm = Math.floor((nowDate.getTime() - videoDate.getTime()) / (1000*60));
        if (diffMm < 60) {
            return `${diffMm} минут назад`
        } else if (diffMm < 60*24) {
            return `${Math.floor(diffMm / 60)} часов назад`;
        } else {
            return `${Math.floor(diffMm / (60*24))} дней назад`;
        }
    });
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date}></DateTimePretty>
        </div>
    )
}

type VideoListProps = {
    list: Item[]
}

function VideoList(props: VideoListProps) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

type Item = {
    url: string
    date: string
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ] as Item[]);

    return (
        <VideoList list={list} />
    );
}
