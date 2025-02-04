
class HelloReact extends React.Component {
  dateFormat = "YYYY-MM-DD";
  timeFormat = "HH:mm:ss";

  constructor(props) {
    super(props);
    let now = new Date().valueOf();

    this.state = {
      dateStr: moment(now).format(this.dateFormat),
      timeStr: moment(now).format(this.timeFormat)
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.updateDatePickerAndTimePicker = this.updateDatePickerAndTimePicker.bind(this);
  }
  onChangeDate(date, dateString) {
    this.setState({ dateStr: dateString });
  }
  onChangeTime(time, timeString) {
    this.setState({ timeStr: timeString });
  }
  updateDatePickerAndTimePicker() {
    let now = new Date().valueOf();
    this.setState({
      dateStr: moment(now).format(this.dateFormat),
      timeStr: moment(now).format(this.timeFormat)
    });
  }
  render() {
    return (
      <div style={{ display: this.props.isShow ? "" : "none" }}>
        <h1>
          Hello {this.props.name}, Now is {this.state.dateStr} {this.state.timeStr}
        </h1>
        <antd.DatePicker onChange={this.onChangeDate} value={moment(this.state.dateStr, this.dateFormat)} />
         
        <antd.TimePicker onChange={this.onChangeTime} value={moment(this.state.timeStr, this.timeFormat)} />
        <br />
        <antd.Button
          type='primary'
          size='default'
          style={{ marginTop: "10px" }}
          onClick={this.updateDatePickerAndTimePicker}>
          更新日期时间控件值
        </antd.Button>
      </div>
    );
  }
}
const root = document.getElementById("HelloReact");
ReactDOM.render(<HelloReact />, root);
