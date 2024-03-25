import "../styles/footer.scss"
function Footer() {
    const food="https://www.wallpapers.net/free-download-assorted-food-hd-wallpaper-for-desktop-mobiles/download/5120x2160.jpg"
  return (
    <div className='footer'>
        <div style={{
                backgroundImage:`url(${food})`,
                backgroundPosition:"center",
                backgroundSize:"cover"
                }}></div>
        <h1>
            PWL Frontdev
        </h1>
        <h5>
            Made with curiousity and a itsy bitsy fun
        </h5>
    </div>
  )
}

export default Footer