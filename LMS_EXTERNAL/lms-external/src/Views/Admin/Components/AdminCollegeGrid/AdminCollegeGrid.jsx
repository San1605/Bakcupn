import CollegeComponent from "../CollegeComponent/CollegeComponent"

function AdminCollegesGrid({ collegesData,deleteApi }) {

    return (
        <div className="adminCollegeGrid">
            {

                collegesData?.map((item, index) =>
                    <CollegeComponent {...item} deleteApi={deleteApi} />
                )
            }
        </div>
    )
}
export default AdminCollegesGrid