class Pagination extends React.Component {
    render0 (){
        return(
          <div>
            {this.state.items && 
              <>
                <ALBUMIFY albumName={window.location.pathname.slice(7)} items={this.state.items} photos={this.state.startitems}/>
                    <SortableGallery items={this.state.items} onSortEnd={this.state.onSortEnd} axis={"xy"} />
              </>
            }
          </div>
        )
    }
}